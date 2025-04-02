
import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TaskSort: React.FC = () => {
  const { sortOrder, setSortOrder } = useTasks();
  
  return (
    <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Newest">Newest</SelectItem>
        <SelectItem value="Oldest">Oldest</SelectItem>
        <SelectItem value="Priority">Priority</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TaskSort;
