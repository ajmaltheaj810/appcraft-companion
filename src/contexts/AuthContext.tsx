
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
  verifyResetToken: (token: string, email: string) => boolean;
  resetPassword: (token: string, email: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Store reset tokens with expiration time
interface ResetToken {
  token: string;
  email: string;
  expiresAt: number; // timestamp
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load reset tokens from localStorage
  const getResetTokens = (): ResetToken[] => {
    const tokensString = localStorage.getItem('todomaster-reset-tokens');
    if (tokensString) {
      return JSON.parse(tokensString);
    }
    return [];
  };

  // Save reset tokens to localStorage
  const saveResetTokens = (tokens: ResetToken[]) => {
    localStorage.setItem('todomaster-reset-tokens', JSON.stringify(tokens));
  };

  useEffect(() => {
    // Check if user is logged in from local storage
    const storedUser = localStorage.getItem('todomaster-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Clean up expired reset tokens
    const tokens = getResetTokens();
    const now = Date.now();
    const validTokens = tokens.filter(token => token.expiresAt > now);
    if (validTokens.length !== tokens.length) {
      saveResetTokens(validTokens);
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
    
    // Only send the email if the user exists
    if (userExists) {
      // Generate a reset token (in a real app, this would be a secure token stored in a database)
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Store the token in localStorage with expiration (1 hour)
      const tokens = getResetTokens();
      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now
      
      // Remove any existing tokens for this email
      const filteredTokens = tokens.filter(token => token.email !== email);
      filteredTokens.push({ token: resetToken, email, expiresAt });
      saveResetTokens(filteredTokens);
      
      // Create a reset link that includes the token and email
      const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
      
      // Send password reset email with actual link
      sendEmail(
        email,
        "Reset your TodoMaster password",
        `Hello,\n\nWe received a request to reset your TodoMaster password. Click on the following link to reset it:\n\n${resetLink}\n\nThis link will expire in 1 hour. If you didn't request this, you can safely ignore this email.`
      );
    }
    
    // Always show success message (for security reasons, don't reveal if email exists)
    toast('Password reset email sent', { 
      description: 'If an account with that email exists, you will receive instructions to reset your password.' 
    });
  };

  const verifyResetToken = (token: string, email: string): boolean => {
    const tokens = getResetTokens();
    const tokenData = tokens.find(t => t.token === token && t.email === email);
    
    if (!tokenData) {
      return false;
    }
    
    // Check if token is expired
    if (tokenData.expiresAt < Date.now()) {
      // Remove expired token
      const filteredTokens = tokens.filter(t => t.token !== token || t.email !== email);
      saveResetTokens(filteredTokens);
      return false;
    }
    
    return true;
  };

  const resetPassword = (token: string, email: string, newPassword: string): boolean => {
    // Verify token is valid
    if (!verifyResetToken(token, email)) {
      return false;
    }
    
    // Update user's password
    const users = JSON.parse(localStorage.getItem('todomaster-users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === email);
    
    if (userIndex === -1) {
      return false;
    }
    
    users[userIndex].password = newPassword;
    localStorage.setItem('todomaster-users', JSON.stringify(users));
    
    // Remove the used token
    const tokens = getResetTokens();
    const filteredTokens = tokens.filter(t => t.token !== token || t.email !== email);
    saveResetTokens(filteredTokens);
    
    // Send password change confirmation email
    sendEmail(
      email,
      "Your TodoMaster password has been reset",
      `Hello,\n\nYour TodoMaster password has been successfully reset. If you did not make this change, please contact our support team immediately.`
    );
    
    return true;
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
      requestPasswordReset,
      verifyResetToken,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
