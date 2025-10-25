import React from 'react';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import { ThemeContext } from "../ThemeContext/themecontext"; 

const Header = () => {
  const navigate = useNavigate(); 
  // const { theme } = useContext(ThemeContext);

  const handleNavigation = (path) => {
    navigate(path); 
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) return null;

  const getInitial = () => {
    if (user?.email && user.email.trim().length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const initial = getInitial();

  // const username = "Alice Nguyen";
  // const initial = username.charAt(0).toUpperCase();
  const SidebarIcon = ({ icon, label, path }) => (
    <button
      onClick={() => handleNavigation(path)} 
    //   className={`flex flex-col items-center justify-center w-full h-16 transition-colors duration-200
    //     ${theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"}`}
    // >
         className={`flex flex-col items-center justify-center w-full h-16 transition-colors duration-200
         "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"}`}
       >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    // <aside className={`w-20 flex flex-col items-center py-4 shadow-md
    //   ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
    <aside className={`w-20 flex flex-col items-center py-4 shadow-md
       "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
  
      <nav className="flex flex-col space-y-4 w-full">
        <SidebarIcon 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V9.75z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
            </svg>
          } 
          label="Home" 
          path="/" 
        />
        <SidebarIcon 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="6" width="20" height="12" rx="2" ry="2" strokeWidth={2} stroke="currentColor" fill="none"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v4m0-4a2 2 0 100 4 2 2 0 000-4" />
            </svg>
          } 
          label="Transactions" 
          path="/transaction" 
        />
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9-15-9z" />
          </svg>} 
          label="Categories" 
          path="/Categories" 
        />
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>} 
          label="Statistics" 
          path="/Statistics" 
        />
        <SidebarIcon 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11h-6M9 11H3m6 0h6M3 15h18M3 7h18" />
          </svg>} 
          label="Settings" 
          path="/Settings" 
        />
      </nav>
      {/* User Avatar */}
        <div className="flex flex-col items-center mb-4 mt-5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {initial}
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="text-xs text-red-500 hover:underline mt-2"
          >
            Logout
          </button>
        </div>
    </aside>
  );
};

export default Header;
