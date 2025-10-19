import React from 'react';
import '../Footer/Style.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Vu Trung Nghia. All rights reserved.
    </footer>
  );
};

export default Footer;
