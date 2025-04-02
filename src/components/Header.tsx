
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary w-full py-3 px-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Logo />
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <User size={18} />
              <span>{user.username}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout} 
              className="text-white hover:bg-primary/80 flex gap-1 items-center"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
