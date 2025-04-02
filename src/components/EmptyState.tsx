
import React from 'react';
import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No tasks found' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <ClipboardList size={48} className="mb-2 opacity-30" />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
