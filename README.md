
### **1. Estructura de archivos y carpetas**

La organización de este proyecto es más compleja, ya que tiene un frontend y un backend. Deberías estructurar tu repositorio de la siguiente manera:

```
/taskeco
|-- server.js        # El archivo principal del servidor (Node.js)
|-- package.json     # Dependencias de Node.js
|-- /public          # Carpeta para los archivos del frontend
|   |-- index.html
|   |-- styles.css
|   |-- dashboard.html (asumiendo que existe por el código JS)
|   |-- /js
|   |   |-- auth.js
|   |   |-- ecoImpact.js
|   |   |-- tasks.js
|-- README.md        # El archivo que describirás en GitHub
```

  * `server.js`: El código del backend con Express, MySQL, JWT y Bcrypt.
  * `package.json`: El archivo que gestiona las dependencias del servidor.
  * `/public`: Contiene todos los archivos del lado del cliente.
  * `index.html`: La página principal o landing page del proyecto.
  * `styles.css`: El CSS que le da estilo a la página.
  * `js/`: Contiene los módulos de JavaScript para la lógica del frontend.

-----

### **2. Contenido del archivo `README.md`**

Un buen `README.md` para este proyecto debe explicar su propósito, las tecnologías utilizadas, cómo configurarlo y cómo usarlo, ya que implica tanto un servidor como un cliente.

````markdown
# 🌿 TaskEco - Gestor de Tareas Ecológicas

TaskEco es una aplicación web que combina la **gestión de tareas con la sostenibilidad ambiental**. El objetivo es motivar a los usuarios a realizar acciones ecológicas, premiándolos con puntos y mostrando el impacto positivo que generan en el planeta.

## 🌟 Características Principales

* **Autenticación de Usuario:** Registro, inicio de sesión y cierre de sesión seguro.
* **Gestión de Tareas:** Crea, completa y gestiona tareas diarias.
* **Impacto Ecológico:** Cada tarea completada tiene un valor de impacto (puntos, ahorro de agua, reducción de CO₂, etc.).
* **Visualización de Datos:** Un dashboard interactivo muestra el progreso del usuario y el impacto acumulado a través de gráficos. 
* **API RESTful:** Backend robusto para gestionar usuarios y tareas.
* **Base de Datos MySQL:** Almacenamiento persistente de datos de usuarios y tareas.

## 🛠️ Tecnologías Utilizadas

### Frontend
* **HTML5:** Estructura semántica de la interfaz.
* **CSS3:** Estilos y diseño responsivo.
* **JavaScript (ES6+):** Lógica del lado del cliente, consumo de la API y manipulación del DOM.
* **Chart.js:** Para la visualización de datos en gráficos.

### Backend
* **Node.js:** Entorno de ejecución del servidor.
* **Express.js:** Framework web para la creación de la API.
* **MySQL2:** Conector de la base de datos MySQL.
* **JWT (JSON Web Tokens):** Autenticación segura y con estado.
* **Bcrypt.js:** Para el cifrado seguro de contraseñas.
* **CORS:** Middleware para habilitar solicitudes de origen cruzado.

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### Prerrequisitos
* Node.js (versión 14 o superior)
* MySQL o un servidor de base de datos compatible.

### 1. Configuración de la Base de Datos

Primero, crea una base de datos y una tabla para los usuarios y las tareas.

```sql
CREATE DATABASE taskeco;
USE taskeco;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    eco_impact JSON,
    category VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
````

### 2\. Configuración del Servidor

1.  Clona el repositorio:
    `git clone https://github.com/tu-usuario/taskeco.git`
2.  Navega a la carpeta del proyecto:
    `cd taskeco`
3.  Instala las dependencias del servidor:
    `npm install express cors jsonwebtoken bcryptjs mysql2`
4.  Crea un archivo `.env` en la raíz del proyecto con tus credenciales de base de datos:
    ```env
    PORT=5000
    SECRET_KEY=tu-clave-secreta-segura
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=taskeco
    ```
5.  Inicia el servidor:
    `node server.js`

El servidor se ejecutará en `http://localhost:5000`.

### 3\. Visualización Frontend

Abre el archivo `public/index.html` en tu navegador o, si utilizas un servidor local para archivos estáticos, accede a la URL correspondiente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes ideas para mejorar la aplicación, por favor, abre un "issue" o envía un "pull request".

