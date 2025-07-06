import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (updated: Task) => void;
  setTasks: (tasks: Task[]) => void;
}

// builds a Zustand hook matching TaskStore interface
export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({ tasks: [task, ...state.tasks] })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      updateTask: (updated) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === updated.id ? updated : t
          ),
        })),
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: 'task-storage', // localStorage key
    }
  )
);
