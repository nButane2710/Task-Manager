import Link from 'next/link';
import { useTaskStore } from '@/lib/store';
import { Task } from '@/types/task';

export default function TaskCard({ task }: { task: Task }) {
  const deleteTask = useTaskStore((s) => s.deleteTask);

  // Add this logic for background color:
  let bgColor = '';
  if (task.priority === 'High') {
    bgColor = 'bg-red-200';
  } else if (task.priority === 'Medium') {
    bgColor = 'bg-yellow-200';
  } else if (task.priority === 'Low') {
    bgColor = 'bg-green-200';
  }

  return (
    <div className={`border p-4 text-black rounded shadow ${bgColor} space-y-1 relative`}>
      <h3 className="text-lg font-semibold">{task.title}</h3>
      {task.description && <p className="text-gray-600">{task.description}</p>}
      <p><strong>Due:</strong> {task.dueDate || 'No deadline'}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      {task.tags.length > 0 && (
        <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
      )}

      <div className="absolute top-2 right-2 flex gap-2 text-sm">
        <Link href={`/task/${task.id}`} className="text-blue-600 hover:underline">
          Edit
        </Link>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this task?')) {
              deleteTask(task.id);
            }
          }}
          className="text-blue-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
