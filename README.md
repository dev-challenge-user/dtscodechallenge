# DTS Developer Challenge - Task Manager

A full-stack task management system built for the HMCTS DTS Developer Technical Test.

## Project Structure

```
dts-developer-challenge/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database layer
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Validation utilities
│   │   └── index.js        # App entry point
│   ├── package.json
│   └── tests/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
└── README.md
```

## Tech Stack

- **Backend**: Node.js, Express, SQLite, Joi (validation)
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

- ✅ Create tasks with title, description, status, and due date
- ✅ Retrieve tasks (all or by ID)
- ✅ Update task status (pending/in-progress/completed)
- ✅ Delete tasks
- ✅ Input validation with Joi
- ✅ Error handling
- ✅ SQLite database storage
- ✅ User-friendly frontend interface

## License

MIT