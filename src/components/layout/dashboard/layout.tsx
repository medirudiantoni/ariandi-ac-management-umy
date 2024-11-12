import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main className='flex flex-col overflow-x-hidden justify-between w-full h-screen'>
        <Header />
        <div className="flex-1 w-full p-6">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
