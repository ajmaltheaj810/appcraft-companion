
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center py-6 text-gray-500 text-sm">
      © {currentYear} TodoMaster. All rights reserved.
    </footer>
  );
};

export default Footer;
