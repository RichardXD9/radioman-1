import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
      {/* You could add a common Footer component here later */}
    </div>
  );
};

export default Layout;

