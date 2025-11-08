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

export const STATUS_OPTIONS = [
  { value: TODO_STATUS.NOT_STARTED, label: 'Not Started' },
  { value: TODO_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TODO_STATUS.COMPLETED, label: 'Completed' }
] as const;