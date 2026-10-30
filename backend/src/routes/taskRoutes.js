const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST /api/tasks - Create a new task
router.post('/', taskController.createTask);

// GET /api/tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id - Get task by ID
router.get('/:id', taskController.getTaskById);

// PATCH /api/tasks/:id - Update task status
router.patch('/:id', taskController.updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;