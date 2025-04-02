
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-4">
            <Logo />
            <h2 className="text-gray-500 mt-2">Manage your tasks effectively</h2>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-center text-gray-500 mb-6">Sign in to access your tasks</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="todo-label">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="todo-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="todo-label">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="todo-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" className="todo-button-primary mt-6">
                Sign In
              </Button>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p>
              Don't have an account? {' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
