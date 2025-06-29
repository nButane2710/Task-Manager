'use client';

import { useState } from 'react';
import ExportImportButtons from '@/components/ExportImportButtons';
import FilterSortBar from '@/components/FilterSortBar';
import TaskList from '@/components/TaskList';

export default function Home() {
  const [filters, setFilters] = useState({
    status: '',
    tag: '',
    due: '',
    sort: '',
  });

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      <ExportImportButtons />

      <FilterSortBar onFilterChange={setFilters} />

      <TaskList filters={filters} />
    </main>
  );
}
