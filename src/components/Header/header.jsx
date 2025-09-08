import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Header/Style.css';

const Header = () => {
  const navigate = useNavigate(); 

  const handleNavigation = (path) => {
    navigate(path); 
  };

  // Sidebar Icon component
  const SidebarIcon = ({ icon, label, path }) => (
    <button
      onClick={() => handleNavigation(path)} 
      className="flex flex-col items-center justify-center w-full h-16 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200"
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <aside className="w-20 bg-white shadow-md flex flex-col items-center py-4">
      <nav className="flex flex-col space-y-4 w-full">
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" /></svg>} 
          label="Transactions" 
          path="/" 
        />
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9-15-9z" /></svg>} 
          label="Categories" 
          path="/Categories" 
        />
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>} 
          label="Statistics" 
          path="/Statistics" 
        />
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11h-6M9 11H3m6 0h6M3 15h18M3 7h18" /></svg>} 
          label="Settings" 
          path="/Settings" 
        />
      </nav>
      {/* User Avatar */}
      <div className="mt-auto mb-4">
        <img 
          src="https://placehold.co/40x40/E2E8F0/4A5568?text=N" 
          alt="User Avatar" 
          className="w-10 h-10 rounded-full" 
        />
      </div>
    </aside>
  );
};

export default Header;
