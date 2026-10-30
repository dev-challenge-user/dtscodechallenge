const request = require('supertest');
const app = require('../src/index');
const { initializeDatabase, getDatabase } = require('../src/models/database');

describe('Task API', () => {
  let createdTaskId;

  beforeAll(async () => {
    // Initialize database before any tests
    await initializeDatabase();
  });

  // Test creating a new task
  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description',
          status: 'pending',
          dueDate: '2025-12-31T23:59:00Z'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      createdTaskId = response.body.id;
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '' });

      expect(response.status).toBe(400);
    });
  });

  // Test getting all tasks
  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const response = await request(app).get('/api/tasks');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test getting a task by ID
  describe('GET /api/tasks/:id', () => {
    it('should return a task by ID', async () => {
      const response = await request(app).get(`/api/tasks/${createdTaskId}`);
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdTaskId);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/99999');
      
      expect(response.status).toBe(404);
    });
  });

  // Test updating a task status
  describe('PATCH /api/tasks/:id', () => {
    it('should update task status', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${createdTaskId}`)
        .send({ status: 'completed' });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('completed');
    });
  });

  // Test deleting task
  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const response = await request(app).delete(`/api/tasks/${createdTaskId}`);
      
      expect(response.status).toBe(204);
    });

    it('should return 404 for already deleted task', async () => {
      const response = await request(app).delete(`/api/tasks/${createdTaskId}`);
      
      expect(response.status).toBe(404);
    });
  });
});