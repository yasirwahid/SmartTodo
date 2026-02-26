import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Checklist, ChecklistTask } from '../types/checklist';
import { loadChecklists, persistChecklists } from '../storage/checklistStorage';

type ChecklistContextValue = {
  checklists: Checklist[];
  isLoading: boolean;
  addChecklist: (title: string) => void;
  updateChecklistTitle: (id: string, title: string) => void;
  deleteChecklist: (id: string) => void;
  addTask: (checklistId: string, title: string) => void;
  toggleTask: (checklistId: string, taskId: string) => void;
  deleteTask: (checklistId: string, taskId: string) => void;
};

const ChecklistContext = createContext<ChecklistContextValue | undefined>(undefined);

export const ChecklistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const stored = await loadChecklists();
      setChecklists(stored);
      setIsLoading(false);
    };
    init();
  }, []);

  const updateAndPersist = useCallback((updater: (prev: Checklist[]) => Checklist[]) => {
    setChecklists(prev => {
      const next = updater(prev);
      void persistChecklists(next);
      return next;
    });
  }, []);

  const addChecklist = useCallback((title: string) => {
    updateAndPersist(prev => [
      {
        id: `checklist-${Date.now()}`,
        title: title.trim(),
        createdAt: Date.now(),
        tasks: [],
      },
      ...prev,
    ]);
  }, [updateAndPersist]);

  const updateChecklistTitle = useCallback(
    (id: string, title: string) => {
      updateAndPersist(prev =>
        prev.map(list =>
          list.id === id
            ? {
                ...list,
                title: title.trim(),
              }
            : list,
        ),
      );
    },
    [updateAndPersist],
  );

  const deleteChecklist = useCallback(
    (id: string) => {
      updateAndPersist(prev => prev.filter(list => list.id !== id));
    },
    [updateAndPersist],
  );

  const addTask = useCallback(
    (checklistId: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) {
        return;
      }
      updateAndPersist(prev =>
        prev.map(list =>
          list.id === checklistId
            ? {
                ...list,
                tasks: [
                  ...list.tasks,
                  {
                    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    title: trimmed,
                    completed: false,
                    createdAt: Date.now(),
                  } as ChecklistTask,
                ],
              }
            : list,
        ),
      );
    },
    [updateAndPersist],
  );

  const toggleTask = useCallback(
    (checklistId: string, taskId: string) => {
      updateAndPersist(prev =>
        prev.map(list =>
          list.id === checklistId
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === taskId
                    ? {
                        ...task,
                        completed: !task.completed,
                      }
                    : task,
                ),
              }
            : list,
        ),
      );
    },
    [updateAndPersist],
  );

  const deleteTask = useCallback(
    (checklistId: string, taskId: string) => {
      updateAndPersist(prev =>
        prev.map(list =>
          list.id === checklistId
            ? {
                ...list,
                tasks: list.tasks.filter(task => task.id !== taskId),
              }
            : list,
        ),
      );
    },
    [updateAndPersist],
  );

  const value = useMemo<ChecklistContextValue>(
    () => ({
      checklists,
      isLoading,
      addChecklist,
      updateChecklistTitle,
      deleteChecklist,
      addTask,
      toggleTask,
      deleteTask,
    }),
    [checklists, isLoading, addChecklist, updateChecklistTitle, deleteChecklist, addTask, toggleTask, deleteTask],
  );

  return <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>;
};

export const useChecklists = (): ChecklistContextValue => {
  const ctx = useContext(ChecklistContext);
  if (!ctx) {
    throw new Error('useChecklists must be used within a ChecklistProvider');
  }
  return ctx;
};

