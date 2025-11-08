import { createContext, useContext, useState, type ReactNode } from "react";

type ViewType = "list" | "kanban";

interface ViewContextType {
  view: ViewType;
  setView: (view: ViewType) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

interface ViewProviderProps {
  children: ReactNode;
}

export const ViewProvider = ({ children }: ViewProviderProps) => {
  const [view, setView] = useState<ViewType>("list");
  const [filter, setFilter] = useState<string>("all");

  return (
    <ViewContext.Provider value={{ view, setView, filter, setFilter }}>
      {children}
    </ViewContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within a ViewProvider");
  }
  return context;
};
