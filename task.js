class TaskManager {
  constructor() {
    this.baseUrl = '/api/tasks';
  }

  async getAllTasks() {
    try {
      const response = await fetch(this.baseUrl, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async createTask(taskData) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(taskData),
      });

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  async updateTask(id, updates) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updates),
      });

      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  }

  async deleteTask(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }

  async completeTask(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error completing task:', error);
      return null;
    }
  }
}

export const taskManager = new TaskManager();