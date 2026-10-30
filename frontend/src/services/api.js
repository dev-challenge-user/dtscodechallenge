const API_BASE = '/api/tasks';

export const api = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch any tasks');
    return response.json();
  },

  // Get task by ID
  getTaskById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch a task');
    return response.json();
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) throw new Error('Failed to create a task');
    return response.json();
  },

  // Update task status
  updateTaskStatus: async (id, status) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update a task');
    return response.json();
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete a task');
  }
};