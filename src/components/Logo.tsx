
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="text-2xl font-bold text-primary">
      TodoMaster
    </Link>
  );
};

export default Logo;
