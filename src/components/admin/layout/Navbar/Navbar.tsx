import { Drawer } from 'antd';
import React from 'react';
import logo from 'src/assets/images/logo.svg';
import { useResponsive } from 'src/hooks';
import { useToggleStore } from 'src/store';
import { NavbarMenu } from './NavbarMenu';

const Navbar: React.FC = () => {
  const { isMobile } = useResponsive(900);
  const { toggleDrawer, isCollapsed, isDrawer } = useToggleStore();

  return (
    <Drawer
      className="max900:w-[260px]"
      placement="left"
      width={isMobile ? 260 : isCollapsed ? 88 : 260}
      onClose={toggleDrawer}
      open={isMobile ? !isDrawer : isDrawer}
      mask={isMobile}
      closable={false}
      zIndex={isMobile ? 600 : 400}
    >
      <nav className="flex flex-col w-full h-full">
        <div className="flex items-center justify-center min-h-[80px] p-4">
          <div className="flex items-center justify-center w-full gap-2">
            <img className="w-full max-w-8" src={logo} alt="Logo" />
            <h3>EDU Platform</h3>
          </div>
        </div>
        <div className="flex-1 px-3 overflow-y-auto">
          <NavbarMenu />
        </div>
      </nav>
    </Drawer>
  );
};

export { Navbar };
