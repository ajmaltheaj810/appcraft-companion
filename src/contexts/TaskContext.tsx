
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Priority } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/sonner';

type Filter = 'All' | 'Active' | 'Completed';
type SortOrder = 'Newest' | 'Oldest' | 'Priority';

interface TaskContextType {
  tasks: Task[];
  filter: Filter;
  sortOrder: SortOrder;
  addTask: (text: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: Filter) => void;
  setSortOrder: (order: SortOrder) => void;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('Newest');

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`todomaster-tasks-${user.id}`);
      if (storedTasks) {
        // Parse dates correctly
        const parsedTasks = JSON.parse(storedTasks, (key, value) => {
          if (key === 'createdAt') {
            return new Date(value);
          }
          return value;
        });
        setTasks(parsedTasks);
      }
    } else {
      setTasks([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`todomaster-tasks-${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = (text: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      createdAt: new Date()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast('Task added', { description: 'Your task has been created' });
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast('Task deleted', { description: 'Your task has been removed' });
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'All') return true;
      return filter === 'Active' ? !task.completed : task.completed;
    })
    .sort((a, b) => {
      if (sortOrder === 'Newest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortOrder === 'Oldest') {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        // Priority sort - High > Medium > Low
        const priorityValue = (p: Priority) => {
          if (p === 'High') return 3;
          if (p === 'Medium') return 2;
          return 1;
        };
        return priorityValue(b.priority) - priorityValue(a.priority);
      }
    });

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        filter, 
        sortOrder, 
        addTask, 
        toggleTask, 
        deleteTask, 
        setFilter, 
        setSortOrder,
        filteredTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
