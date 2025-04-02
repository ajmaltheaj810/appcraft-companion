
import React from 'react';
import { useTasks } from '@/contexts/TaskContext';

const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useTasks();
  
  const filters = ['All', 'Active', 'Completed'];
  
  return (
    <div className="flex border-b">
      {filters.map((f) => (
        <button
          key={f}
          className={`py-2 px-4 ${filter === f ? 'tab-active' : ''}`}
          onClick={() => setFilter(f as any)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
