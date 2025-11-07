import { TaskStatus, type StatusConfig } from '../types/todo';

export const TASK_STATUS: Record<string, TaskStatus> = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  [TASK_STATUS.NOT_STARTED]: {
    label: 'Not Started',
    color: 'bg-gray-100 text-gray-600 border border-gray-200',
    icon: '📝'
  },
  [TASK_STATUS.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-600 border border-blue-200',
    icon: '🚀'
  },
  [TASK_STATUS.COMPLETED]: {
    label: 'Completed',
    color: 'bg-green-100 text-green-600 border border-green-200',
    icon: '✅'
  }
};

export const STATUS_OPTIONS = [
  { value: TASK_STATUS.NOT_STARTED, label: 'Not Started' },
  { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TASK_STATUS.COMPLETED, label: 'Completed' }
];