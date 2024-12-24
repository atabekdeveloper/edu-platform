import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-full overflow-hidden">
      <Header />
      <main className="flex-[1_1_auto]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { UserLayout };
