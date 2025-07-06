'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/lib/store';
import * as yup from 'yup';

// Yup validation schema
const taskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  dueDate: yup.string().nullable(),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required(),
  tags: yup.string(),
  status: yup.string().oneOf(['Todo', 'In Progress', 'Done']).required(),
});

// Local form state (tags as string)
type TaskFormState = {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  tags: string;
  status: string;
};

export default function CreatePage() {
  const router = useRouter();
  const addTask = useTaskStore((s) => s.addTask);

  const [task, setTask] = useState<TaskFormState>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    tags: '',
    status: 'Todo',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      await taskSchema.validate(task, { abortEarly: false });

      const tagsArray = task.tags
        ? task.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];

      addTask({
        id: Date.now().toString(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority as 'Low' | 'Medium' | 'High',
        tags: tagsArray,
        status: task.status as 'Todo' | 'In Progress' | 'Done',
        createdAt: new Date().toISOString(),
      });

      // Reset form
      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        tags: '',
        status: 'Todo',
      });

      // Go back to dashboard
      router.push('/');
    } catch (err: any) {
      if (err.inner) {
        const errs: { [key: string]: string } = {};
        err.inner.forEach((e: any) => {
          if (e.path) errs[e.path] = e.message;
        });
        setErrors(errs);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>

      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border mb-1"
      />
      {errors.title && <p className="text-red-600 text-sm mb-2">{errors.title}</p>}

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border mb-1"
      />
      {errors.description && <p className="text-red-600 text-sm mb-2">{errors.description}</p>}

      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="w-full p-2 border mb-1"
      />
      {errors.dueDate && <p className="text-red-600 text-sm mb-2">{errors.dueDate}</p>}

      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full p-2 border mb-1"
      >
        <option value="Low" className='text-black'>Low</option>
        <option value="Medium" className='text-black'>Medium</option>
        <option value="High" className='text-black'>High</option>
      </select>
      {errors.priority && <p className="text-red-600 text-sm mb-2">{errors.priority}</p>}

      <input
        name="tags"
        value={task.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full p-2 border mb-1"
      />
      {errors.tags && <p className="text-red-600 text-sm mb-2">{errors.tags}</p>}

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      >
        <option value="Todo" className='text-black'>Todo</option>
        <option value="In Progress" className='text-black'>In Progress</option>
        <option value="Done" className='text-black'>Done</option>
      </select>
      {errors.status && <p className="text-red-600 text-sm mb-2">{errors.status}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
