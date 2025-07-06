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
        <option value="" className='text-black'>All Status</option>
        <option value="Todo" className='text-black'>Todo</option>
        <option value="In Progress" className='text-black'>In Progress</option>
        <option value="Done" className='text-black'>Done</option>
      </select>

      <input
        name="tag"
        value={localFilters.tag}
        onChange={handleChange}
        placeholder="Filter by tag"
        className="p-2 border"
      />

      <select name="due" value={localFilters.due} onChange={handleChange} className="p-2 border" >
        <option value="" className='text-black'>All Dates</option>
        <option value="today" className='text-black'>Today</option>
        <option value="week" className='text-black'>This Week</option>
      </select>

      <select name="sort" value={localFilters.sort} onChange={handleChange} className="p-2 border">
        <option value="" className='text-black'>No Sort</option>
        <option value="dueDate" className='text-black'>Due Date</option>
        <option value="priority" className='text-black'>Priority</option>
        <option value="createdAt" className='text-black'>Creation Date</option>
      </select>
    </div>
  );
}
