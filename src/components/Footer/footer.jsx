import React from 'react';
import '../Footer/Style.css'; 

const Footer = () => {
  return (
    <footer className="p-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Vu Trung Nghia. All rights reserved.
    </footer>
  );
};

export default Footer;
