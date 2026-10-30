const TaskModel = require('../models/taskModel');
const { validateTask, validateStatusUpdate } = require('../utils/validation');

const taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const { error, value } = validateTask(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const task = await TaskModel.create(
        value.title,
        value.description,
        value.status || 'pending',
        value.dueDate
      );

      res.status(201).json(task);
    } catch (err) {
      console.error('Create task error:', err);
      res.status(500).json({ error: 'Failed to create task' });
    }
  },

  // Get task by ID
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskModel.findById(id);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (err) {
      console.error('Get task error:', err);
      res.status(500).json({ error: 'Failed to get task' });
    }
  },

  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.findAll();
      res.json(tasks);
    } catch (err) {
      console.error('Get all tasks error:', err);
      res.status(500).json({ error: 'Failed to get tasks' });
    }
  },

  // Update task status
  updateTaskStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { error, value } = validateStatusUpdate(req.body);
      
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await TaskModel.updateStatus(id, value.status);
      
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const updatedTask = await TaskModel.findById(id);
      res.json(updatedTask);
    } catch (err) {
      console.error('Update task error:', err);
      res.status(500).json({ error: 'Failed to update task' });
    }
  },

  // Delete task
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await TaskModel.delete(id);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(204).send();
    } catch (err) {
      console.error('Delete task error:', err);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};

module.exports = taskController;