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

```
src/
├── 📦 components/          # React Components
│   ├── KanbanView.tsx     # Kanban Board Component
│   ├── ListView.tsx       # List View Component
│   ├── TodoForm.tsx       # Task Creation & Edit Form
│   ├── TodoStats.tsx      # Statistics Dashboard
│   └── ...                # Additional Components
├── 🎯 contexts/           # React Contexts
│   ├── TodoContext.ts     # Todo State Management
│   └── ViewContext.ts     # UI View State Management
├── 🪝 hooks/              # Custom React Hooks
│   └── useTodos.ts        # Todo Data Management Hook
├── 🔌 services/           # API Services
│   └── api.ts             # HTTP Client Configuration
├── 📐 types/              # TypeScript Type Definitions
│   └── todo.ts            # Todo-Related Type Definitions
└── 🔧 constants/          # Application Constants
    └── todo.ts            # Status Constants & Configurations
```

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
- Shared types between frontend and backend
- For Kanban view didn't implement pagination but using same endpoint with list view (default limit 10)
