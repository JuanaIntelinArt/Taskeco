import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createPool } from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'taskeco-secret-key';

// Configuración de la base de datos
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskeco',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Token inválido' });
  }
};

// Rutas de autenticación
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    const token = jwt.sign({ id: result.insertId }, SECRET_KEY, { expiresIn: '7d' });
    
    res.status(201).send({ 
      user: { id: result.insertId, username, email },
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).send({ error: 'Error en el registro' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length === 0 || !await bcrypt.compare(password, rows[0].password_hash)) {
      throw new Error('Credenciales inválidas');
    }
    
    const user = rows[0];
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' });
    
    res.send({ 
      user: { id: user.id, username: user.username, email: user.email },
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).send({ error: error.message || 'Error en el login' });
  }
});

// Rutas de tareas
app.get('/api/tasks', authenticate, async (req, res) => {
  try {
    const [tasks] = await pool.execute(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date',
      [req.user.id]
    );
    res.send(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send({ error: 'Error al obtener tareas' });
  }
});

app.post('/api/tasks', authenticate, async (req, res) => {
  try {
    const { title, description, due_date, eco_impact, category } = req.body;
    
    const [result] = await pool.execute(
      `INSERT INTO tasks 
      (user_id, title, description, due_date, eco_impact, category) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, title, description, due_date, JSON.stringify(eco_impact), category]
    );
    
    const [task] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).send(task[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).send({ error: 'Error al crear tarea' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});