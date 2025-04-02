
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email && password.length >= 6) {
      register(username, email, password);
    }
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
            <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
            <p className="text-center text-gray-500 mb-6">Sign up to get started with TodoMaster</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="todo-label">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 todo-input"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="todo-label">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 todo-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="todo-label">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 todo-input"
                    placeholder="Create password (min. 6 characters)"
                    minLength={6}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="todo-button-primary mt-6">
                Sign Up
              </Button>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p>
              Already have an account? {' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
