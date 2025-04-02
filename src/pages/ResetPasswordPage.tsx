
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  
  const { resetPassword, verifyResetToken } = useAuth();
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (token && email) {
      const isValid = verifyResetToken(token, email);
      setIsValidToken(isValid);
    } else {
      setIsValidToken(false);
    }
  }, [token, email, verifyResetToken]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!token || !email) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const success = resetPassword(token, email, password);
    if (success) {
      setIsResetSuccessful(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError('Failed to reset password. Please try again or request a new reset link.');
    }
  };
  
  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <p>Verifying reset link...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (isValidToken === false) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-4">
              <Logo />
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-center mb-2">Invalid Reset Link</h2>
              <p className="text-center text-gray-500 mb-6">
                The password reset link is invalid or has expired.
              </p>
              
              <div className="text-center mt-4">
                <Link to="/forgot-password">
                  <Button className="todo-button-primary">
                    Request New Reset Link
                  </Button>
                </Link>
              </div>
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
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-4">
            <Logo />
            <h2 className="text-gray-500 mt-2">Manage your tasks effectively</h2>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-8 mt-8">
            {!isResetSuccessful ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-2">Reset Your Password</h2>
                <p className="text-center text-gray-500 mb-6">
                  Create a new password for your account
                </p>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="todo-label">New Password</label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="todo-input"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="todo-label">Confirm New Password</label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="todo-input"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="todo-button-primary mt-6 w-full">
                    Reset Password
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="text-green-600 text-xl mb-2">Password Reset Successful!</div>
                <p className="text-gray-500 mb-4">
                  Your password has been reset successfully. You'll be redirected to the login page shortly.
                </p>
                <Link to="/login">
                  <Button className="todo-button-primary">
                    Login Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
