
import React, { useState } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Priority } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

const AddTaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const { addTask } = useTasks();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText.trim(), priority);
      setTaskText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-sm mb-6">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-7">
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="w-full"
            required
          />
        </div>
        
        <div className="col-span-12 md:col-span-3">
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as Priority)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-12 md:col-span-2">
          <Button type="submit" className="w-full bg-todo-dark-blue">
            <Plus size={18} className="mr-1" />
            Add Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
