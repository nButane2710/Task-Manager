'use client';
import { useTaskStore } from '@/lib/store';

export default function ExportImportButtons() {
  const tasks = useTaskStore((s) => s.tasks);
  const setTasks = useTaskStore((s) => s.setTasks);

  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string);
        if (Array.isArray(imported)) {
          const valid = imported.every(
            (t) => t.id && typeof t.id === 'string' && t.title
          );
          if (valid) {
            setTasks(imported);
            alert('Tasks imported successfully!');
          } else {
            alert('Invalid JSON structure.');
          }
        } else {
          alert('Invalid file.');
        }
      } catch (err) {
        alert('Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
  };

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={handleExport}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Export Tasks
      </button>
      <label className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">
        Import Tasks
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
