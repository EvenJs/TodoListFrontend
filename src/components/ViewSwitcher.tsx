import { List, Kanban as KanbanIcon } from "lucide-react";
import { useViewContext } from "../contexts/ViewContext";

const ViewSwitcher = () => {
  const { view, setView } = useViewContext();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {view === "list" ? "Task List" : "Kanban Board"}
        </h2>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md transition-colors ${
              view === "list"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`p-2 rounded-md transition-colors ${
              view === "kanban"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Kanban View"
          >
            <KanbanIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSwitcher;
