
export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
