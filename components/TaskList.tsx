'use client';

import { useTaskStore } from '@/lib/store';
import TaskCard from './TaskCard';
import { parseISO, isValid, isToday, isThisWeek } from 'date-fns';

export default function TaskList({ filters }: { filters: {
  status: string;
  tag: string;
  due: string;
  sort: string;
} }) {
  const tasks = useTaskStore((s) => s.tasks);

  const filteredTasks = tasks
    .filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.tag && !task.tags.some((t) => t.toLowerCase().includes(filters.tag.toLowerCase())))
        return false;

      if (filters.due && task.dueDate) {
        const dueDate = parseISO(task.dueDate);
        if (!isValid(dueDate)) return false;

        if (filters.due === 'today' && !isToday(dueDate)) return false;
        if (filters.due === 'week' && !isThisWeek(dueDate, { weekStartsOn: 1 })) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'dueDate') {
        return (a.dueDate || '').localeCompare(b.dueDate || '');
      }
      if (filters.sort === 'createdAt') {
        return (a.createdAt || '').localeCompare(b.createdAt || '');
      }
      if (filters.sort === 'priority') {
        const order: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      }
      return 0;
    });

  return (
    <div className="grid gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
