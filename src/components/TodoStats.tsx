import { motion } from "framer-motion";
import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import { TASK_STATUS } from "../constants/todo";
import type { Task } from "../types/todo";

interface TodoStatsProps {
  todos: Task[];
}

const TodoStats = ({ todos }: TodoStatsProps) => {
  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.status === TASK_STATUS.COMPLETED)
      .length,
    inProgress: todos.filter((todo) => todo.status === TASK_STATUS.IN_PROGRESS)
      .length,
    notStarted: todos.filter((todo) => todo.status === TASK_STATUS.NOT_STARTED)
      .length,
  };

  const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: Clock,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      label: "Not Started",
      value: stats.notStarted,
      icon: Clock,
      color: "text-warning-600",
      bgColor: "bg-warning-100",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: PlayCircle,
      color: "text-primary-600",
      bgColor: "bg-primary-100",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-success-600",
      bgColor: "bg-success-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 text-center"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} ${stat.color} mb-2`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-900">
            Overall Progress
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TodoStats;
