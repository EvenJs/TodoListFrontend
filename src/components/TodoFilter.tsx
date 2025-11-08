import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { TaskStatus } from "../types/todo";
import { STATUS_OPTIONS } from "../constants/todo";

interface TodoFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TodoFilter = ({ filter, onFilterChange }: TodoFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 mb-6 flex-wrap"
    >
      <div className="flex items-center gap-2 text-gray-600">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filter:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange("all")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-blue-100 text-blue-600 border border-blue-200 shadow-md"
              : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
          }`}
        >
          All Tasks
        </button>

        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === option.value
                ? `${
                    option.value === TaskStatus.NOT_STARTED
                      ? "bg-amber-100 text-amber-600 border-amber-200"
                      : option.value === TaskStatus.IN_PROGRESS
                      ? "bg-blue-100 text-blue-600 border-blue-200"
                      : "bg-green-100 text-green-600 border-green-200"
                  } shadow-md`
                : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TodoFilter;
