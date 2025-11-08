# Todoist - Frontend

A modern, responsive Todo application built with React, TypeScript, Tailwind CSS, and Framer Motion. Features both list and Kanban board views for task management.

## 🚀 Features

- **Dual View Modes**: Switch between List view and Kanban board view
- **Real-time Statistics**: Dashboard with task completion progress
- **CRUD Operations**: Create, read, update, and delete todos
- **Status Management**: Track tasks as Not Started, In Progress, or Completed
- **Pagination**: Efficiently handle large numbers of tasks
- **Filtering**: Filter tasks by status
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Beautiful transitions with Framer Motion
- **Type Safety**: Full TypeScript coverage

## 🛠 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Backend API server running (see backend README)

run project by Docker(Recommended)
ensure installed

## Project Structure

src/
├── components/ # React components
│ ├── KanbanView.tsx # Kanban board component
│ ├── ListView.tsx # List view component
│ ├── TodoForm.tsx # Task creation form
│ ├── TodoStats.tsx # Statistics dashboard
│ └── ...
├── contexts/ # React contexts
│ ├── TodoContext.ts # Todo state management
│ └── ViewContext.ts # UI view state
├── hooks/ # Custom React hooks
│ └── useTodos.ts # Todo data management
├── services/ # API services
│ └── api.ts # HTTP client configuration
├── types/ # TypeScript type definitions
│ └── todo.ts # Todo-related types
└── constants/ # Application constants
└── todo.ts # Status constants and configurations

## Install Dependencies

```bash
npm install
```

## 🧩Environment Variables

```bash
cp .env.example .env

```

## 🧱 Run Locally (Dev Mode)

```bash
npm run dev

```

## 🐳 Run with Docker

```bash
docker compose up --build
```

## Future Improvements

- This project using context to manage the states, because the TodoList App is not that complex, if getting more states will setup Redux for it.
- Add tests
- create develop branch and generate pull request to merge into master branch to make project safe.
- improve user experience
