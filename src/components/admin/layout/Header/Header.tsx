import { Space, Tooltip } from 'antd';
import React from 'react';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import screenfull from 'screenfull';

import { useResponsive } from 'src/hooks';
import { useToggleStore } from 'src/store';
import { HeaderSetting } from './HeaderSetting';

import logo from 'src/assets/images/logo.svg';
import { HeaderLang } from './HeaderLang';

const Header: React.FC = () => {
  const { isMobile } = useResponsive(900);
  const { toggleDrawer, toggleCollapsed } = useToggleStore();

  const onToggleDrawer = () => (isMobile ? toggleDrawer() : toggleCollapsed());

  return (
    <header className="flex items-center justify-between w-full min-h-[80px] fixed z-[500] bg-white px-5 top-0">
      <div className="flex items-center justify-between gap-3 basis-[245px] px-2">
        <div className="flex items-center gap-2 max900:hidden">
          <img className="max-w-[140px]" src={logo} alt="Logo" />
          <h3>EDU Platform</h3>
        </div>
        <button className="py-2 rounded-md custom-icon" onClick={onToggleDrawer}>
          <RxHamburgerMenu />
        </button>
      </div>
      <Space>
        <HeaderLang />
        <Tooltip placement="bottom" title="Fullscreen">
          <button className="p-2 rounded-md custom-icon" onClick={() => screenfull.toggle()}>
            <BsArrowsFullscreen />
          </button>
        </Tooltip>
        <HeaderSetting />
      </Space>
    </header>
  );
};

export { Header };
