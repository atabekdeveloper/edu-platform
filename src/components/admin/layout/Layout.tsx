import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthPersistStore, useToggleStore } from 'src/store';

import { UpdatePasswordForm } from './Form/UpdatePasswordForm';
import { Header } from './Header/Header';
import { Navbar } from './Navbar/Navbar';

const Layout: React.FC = () => {
  const token = useAuthPersistStore((state) => state.accessToken);
  const { isDrawer, isCollapsed } = useToggleStore();

  const getMainMargin = () => {
    if (!isDrawer) return 'max900:ml-3 ml-5';
    return isCollapsed ? 'ml-[88px]' : 'ml-[260px]';
  };

  return (
    <div className="flex w-full h-full bg-white">
      <Header />
      <Navbar />
      <UpdatePasswordForm />
      <main
        className={`relative transition-all duration-200 grow min-h-[calc(100vh_-_88px)] bg-[#eef2f6] flex flex-col mt-[88px] p-5 overflow-auto rounded-t-[8px] max900:mr-3 mr-5 max900:ml-3 ${getMainMargin()}`}
      >
        {token ? <Outlet /> : <Navigate to="/" />}
      </main>
    </div>
  );
};

export { Layout };
