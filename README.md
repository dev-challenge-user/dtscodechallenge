# DTS Developer Challenge - Task Manager

A full-stack task management system built for the HMCTS DTS Developer Technical Test.

## Project Structure

```
dts-developer-challenge/
├── README.md
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── models/
│   │   │   ├── database.js
│   │   │   └── taskModel.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   └── index.js
│   └── tests/
│       └── taskController.test.js
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── pages/
        │   ├── TaskList.jsx
        │   └── TaskForm.jsx
        └── services/
            └── api.js
```

## Tech Stack

- **Backend**: Node.js, Express, sql.js (SQLite), Joi (validation)
- **Frontend**: React 18, Vite, React Router

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| PATCH | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Task Object Schema

```json
{
  "title": "string (required, max 200 chars)",
  "description": "string (optional, max 1000 chars)",
  "status": "pending | in-progress | completed",
  "dueDate": "ISO date string (optional)"
}
```

## Running the Application

### Backend

```bash
cd backend
npm install
npm start
```

The API runs on `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

## Features Implemented

- Create tasks with title, description, status, and due date
- Retrieve tasks (all or by ID)
- Update task status (pending/in-progress/completed)
- Delete tasks
- Input validation with Joi
- Error handling
- SQLite database storage
- User-friendly frontend interface

## License

MIT