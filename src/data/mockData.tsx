import type { Task } from "../types/todo";

export const initialTodos: Task[] = [
  {
    _id: "1",
    title: "Complete project proposal",
    description:
      "Finish the client project proposal document with all requirements",
    status: "completed",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    _id: "2",
    title: "Team meeting preparation",
    description: "Prepare agenda and materials for the weekly team meeting",
    status: "in_progress",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T11:20:00Z",
  },
  {
    _id: "3",
    title: "Learn new framework",
    description:
      "Spend 2 hours learning the new React features and best practices",
    status: "not_started",
    createdAt: "2024-01-16T14:00:00Z",
    updatedAt: "2024-01-16T14:00:00Z",
  },
  {
    _id: "4",
    title: "Code review for PR #123",
    description:
      "Review the pull request from the junior developer and provide feedback",
    status: "not_started",
    createdAt: "2024-01-17T08:30:00Z",
    updatedAt: "2024-01-17T08:30:00Z",
  },
  {
    _id: "5",
    title: "Update documentation",
    description: "Update API documentation with the new endpoints and examples",
    status: "in_progress",
    createdAt: "2024-01-17T10:15:00Z",
    updatedAt: "2024-01-17T13:45:00Z",
  },
];
