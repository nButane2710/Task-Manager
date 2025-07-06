'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { Task } from '@/types/task';

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const tasks = useTaskStore((s) => s.tasks);
  const updateTask = useTaskStore((s) => s.updateTask);

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === id);
    if (found) {
      setTask(found);
    }
  }, [id, tasks]);

  if (!task) {
    return <p className="p-4">Task not found...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = () => {
    if (!task.title) {
      alert('Title is required');
      return;
    }

    updateTask({
      ...task,
      tags: typeof task.tags === 'string'
        ? (task.tags as string).split(',').map((t) => t.trim())
        : task.tags,
    });

    router.push('/');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>

      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border mb-2"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border mb-2"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      >
        <option value="Low" className='text-black'>Low</option>
        <option value="Medium" className='text-black'>Medium</option>
        <option value="High" className='text-black'>High</option>
      </select>
      <input
        name="tags"
        placeholder="Tags (comma-separated)"
        value={Array.isArray(task.tags) ? task.tags.join(', ') : task.tags}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      >
        <option value="Todo" className='text-black'>Todo</option>
        <option value="In Progress" className='text-black'>In Progress</option>
        <option value="Done" className='text-black'>Done</option>
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          onClick={() => router.push('/')}
          className="border border-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
