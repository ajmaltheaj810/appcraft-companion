
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-6">
          <Logo />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        
        <Link to="/">
          <Button className="bg-primary">Return to Home</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
