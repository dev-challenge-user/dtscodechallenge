import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedTask = await api.updateTaskStatus(id, newStatus);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>My Tasks</h2>
        <Link to="/tasks/new" className="btn btn-primary">Create Task</Link>
      </div>
      
      {tasks.length === 0 ? (
        <p>No tasks yet. Create one to get started!</p>
      ) : (
        <ul className="tasks">
          {tasks.map(task => (
            <li key={task.id} className={`task-item status-${task.status}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                {task.dueDate && <small>Due: {new Date(task.dueDate).toLocaleString()}</small>}
              </div>
              <div className="task-actions">
                <select 
                  value={task.status} 
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <Link to={`/tasks/${task.id}/edit`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(task.id)} className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;