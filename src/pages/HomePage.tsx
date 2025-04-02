
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h2 className="text-gray-500 mb-12">Manage your tasks effectively</h2>
          
          <div className="space-y-6">
            <Link to="/register">
              <Button className="w-full py-6 bg-todo-dark-blue">Create Account</Button>
            </Link>
            
            <div className="text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline">Sign In</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
