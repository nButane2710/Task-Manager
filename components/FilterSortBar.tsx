'use client';

import { useState } from 'react';

type FilterProps = {
  onFilterChange: (filters: {
    status: string;
    tag: string;
    due: string;
    sort: string;
  }) => void;
};

export default function FilterSortBar({ onFilterChange }: FilterProps) {
  const [localFilters, setLocalFilters] = useState({
    status: '',
    tag: '',
    due: '',
    sort: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const updated = { ...localFilters, [e.target.name]: e.target.value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <select name="status" value={localFilters.status} onChange={handleChange} className="p-2 border">
        <div
        className='text-black'>
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </div>
      </select>

      <input
        name="tag"
        value={localFilters.tag}
        onChange={handleChange}
        placeholder="Filter by tag"
        className="p-2 border"
      />

      <select name="due" value={localFilters.due} onChange={handleChange} className="p-2 border">
        <div
        className='text-black'>
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
        </div>
      </select>

      <select name="sort" value={localFilters.sort} onChange={handleChange} className="p-2 border">
        <div
        className='text-black'>
          <option value="">No Sort</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Creation Date</option>
        </div>
      </select>
    </div>
  );
}
