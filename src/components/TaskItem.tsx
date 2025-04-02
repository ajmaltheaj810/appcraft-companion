
import React from 'react';
import { Task } from '@/types';
import { Check, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTasks } from '@/contexts/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTasks();

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
            task.completed 
              ? 'bg-primary border-primary text-white' 
              : 'border-gray-300'
          }`}
        >
          {task.completed && <Check size={14} />}
        </button>
        
        <div className="flex flex-col">
          <p className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.text}
          </p>
          <Badge className={`${getPriorityClass(task.priority)} mt-1 w-fit`}>
            {task.priority}
          </Badge>
        </div>
      </div>
      
      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;
