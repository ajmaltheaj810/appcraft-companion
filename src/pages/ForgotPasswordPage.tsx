
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestPasswordReset(email);
    setIsSubmitted(true);
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
            <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
            <p className="text-center text-gray-500 mb-6">
              {!isSubmitted 
                ? "Enter your email address and we'll send you a link to reset your password."
                : "If an account with that email exists, we've sent a password reset link."}
            </p>
            
            {!isSubmitted ? (
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
                
                <Button type="submit" className="todo-button-primary mt-6 w-full">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <p className="mb-4 text-green-600">Check your email for the reset link.</p>
                <Button 
                  className="todo-button-primary mt-2"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Another Email
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p>
              Remember your password? {' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
