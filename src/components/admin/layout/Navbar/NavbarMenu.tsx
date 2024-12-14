import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UiMenu } from 'src/components/admin/ui';
import { useResponsive } from 'src/hooks';
import { useToggleStore } from 'src/store';
import { useRoutes } from '../routes';

const NavbarMenu: React.FC = () => {
  const { isCollapsed, toggleDrawer } = useToggleStore();
  const { isMobile } = useResponsive(900);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const routes = useRoutes();

  return (
    <UiMenu
      className={`pb-8 ${isMobile ? '' : isCollapsed ? 'pr-3' : ''}`}
      mode="inline"
      inlineCollapsed={!isMobile && isCollapsed}
      selectedKeys={[pathname]}
      onSelect={(e) => navigate(e.key)}
      onClick={() => isMobile && toggleDrawer()}
      items={routes.filter((item) => !isCollapsed || !item.type) as any}
    />
  );
};

export { NavbarMenu };
