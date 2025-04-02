
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
  requestPasswordReset: (email: string) => void;
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

  // Simulate sending an email
  const sendEmail = (to: string, subject: string, body: string) => {
    // In a real app, this would be an API call to your email service
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    
    // For demonstration purposes, we'll show a toast
    toast(`Email sent to ${to}`, {
      description: subject,
    });
  };

  const login = (email: string, password: string) => {
    // In a real app, you would validate against a backend
    const users = JSON.parse(localStorage.getItem('todomaster-users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('todomaster-user', JSON.stringify(userWithoutPassword));
      
      // Send login notification email
      sendEmail(
        email,
        "New login to your TodoMaster account",
        `Hello ${foundUser.username},\n\nWe detected a new login to your TodoMaster account. If this was you, no action is needed. If you didn't log in, please change your password immediately.`
      );
      
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
    
    // Send welcome email
    sendEmail(
      email,
      "Welcome to TodoMaster!",
      `Hello ${username},\n\nThank you for creating an account with TodoMaster. We're excited to help you manage your tasks effectively.`
    );
    
    navigate('/dashboard');
    toast('Registration successful', { description: 'Your account has been created!' });
  };

  const requestPasswordReset = (email: string) => {
    // In a real app, you would verify the email exists and send a reset link
    const users = JSON.parse(localStorage.getItem('todomaster-users') || '[]');
    const userExists = users.some((u: any) => u.email === email);
    
    // Only send the email if the user exists (but don't tell the user if it exists or not for security)
    if (userExists) {
      // Generate a "reset token" (in a real app, this would be a secure token stored in a database)
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Send password reset email
      sendEmail(
        email,
        "Reset your TodoMaster password",
        `Hello,\n\nWe received a request to reset your TodoMaster password. Use the following link to reset it:\n\n${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}\n\nIf you didn't request this, you can safely ignore this email.`
      );
    }
    
    // Always show success message (for security reasons, don't reveal if email exists)
    toast('Password reset email sent', { 
      description: 'If an account with that email exists, you will receive instructions to reset your password.' 
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('todomaster-user');
    navigate('/login');
    toast('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      register, 
      requestPasswordReset 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
