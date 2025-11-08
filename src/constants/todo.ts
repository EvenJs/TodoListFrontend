import { type StatusConfig } from '../types/todo';

export const TODO_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const;

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  [TODO_STATUS.NOT_STARTED]: {
    label: 'Not Started',
    color: 'bg-gray-100 text-gray-600 border border-gray-200',
    icon: '📝'
  },
  [TODO_STATUS.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-600 border border-blue-200',
    icon: '🚀'
  },
  [TODO_STATUS.COMPLETED]: {
    label: 'Completed',
    color: 'bg-green-100 text-green-600 border border-green-200',
    icon: '✅'
  }
};

export const KANBAN_COLUMNS = {
  [TODO_STATUS.NOT_STARTED]: {
    id: TODO_STATUS.NOT_STARTED,
    title: 'To Do',
    color: 'bg-amber-500',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50'
  },
  [TODO_STATUS.IN_PROGRESS]: {
    id: TODO_STATUS.IN_PROGRESS,
    title: 'In Progress',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50'
  },
  [TODO_STATUS.COMPLETED]: {
    id: TODO_STATUS.COMPLETED,
    title: 'Done',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50'
  }
} as const;

export const STATUS_OPTIONS = [
  { value: TODO_STATUS.NOT_STARTED, label: 'Not Started' },
  { value: TODO_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TODO_STATUS.COMPLETED, label: 'Completed' }
] as const;