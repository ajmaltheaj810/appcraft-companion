
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddTaskForm from '@/components/AddTaskForm';
import TaskFilter from '@/components/TaskFilter';
import TaskSort from '@/components/TaskSort';
import TaskItem from '@/components/TaskItem';
import EmptyState from '@/components/EmptyState';
import { useTasks } from '@/contexts/TaskContext';

const DashboardPage: React.FC = () => {
  const { filteredTasks } = useTasks();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Tasks</h1>
          <p className="text-gray-500">Manage your tasks and stay productive</p>
        </div>
        
        <AddTaskForm />
        
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <TaskFilter />
            <TaskSort />
          </div>
          
          <div>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
