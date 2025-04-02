
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from local storage
    const storedUser = localStorage.getItem('todomaster-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, you would validate against a backend
    const users = JSON.parse(localStorage.getItem('todomaster-users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('todomaster-user', JSON.stringify(userWithoutPassword));
      navigate('/dashboard');
      toast('Login successful', { description: 'Welcome back!' });
    } else {
      toast('Login failed', { description: 'Invalid email or password' });
    }
  };

  const register = (username: string, email: string, password: string) => {
    // In a real app, you would send this to a backend
    const users = JSON.parse(localStorage.getItem('todomaster-users') || '[]');
    
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      toast('Registration failed', { description: 'Email already in use' });
      return;
    }
    
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('todomaster-users', JSON.stringify(users));
    
    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('todomaster-user', JSON.stringify(userWithoutPassword));
    
    navigate('/dashboard');
    toast('Registration successful', { description: 'Your account has been created!' });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('todomaster-user');
    navigate('/login');
    toast('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
