import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>My Task Manager</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;