import { Button, Popover } from 'antd';
import React from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import logo from 'src/assets/images/logo.svg';
import { useResponsive } from 'src/hooks';
import { useAuthPersistStore } from 'src/store';
import { HeaderCategory } from './HeaderCategory';
import { HeaderLang } from './HeaderLang';

const Header: React.FC = () => {
  const [activeCatalog, setActiveCatalog] = React.useState(false);
  const token = useAuthPersistStore((state) => state.accessToken);
  const { isMobile } = useResponsive(1024);
  const navigate = useNavigate();
  return (
    <header className="container relative flex justify-between gap-5 py-7">
      <div className="items-center hidden gap-5 lg:flex">
        <div className="items-center hidden gap-2 lg:flex">
          <img className="max-w-[140px]" src={logo} alt="Logo" />
          <h3 className="text-primary">EDU Platform</h3>
        </div>
        <Popover
          content={<HeaderCategory setActiveCatalog={setActiveCatalog} />}
          placement="bottom"
          overlayStyle={{ width: '300px' }}
          overlayInnerStyle={{ padding: '10px 0px' }}
          arrow={false}
          open={!isMobile && activeCatalog}
          onOpenChange={(value) => setActiveCatalog(value)}
          trigger="click"
        >
          <button className="items-center hidden gap-2 px-4 py-2 border rounded-md lg:flex border-primary text-primary">
            <span className="font-bold">Каталог</span>
            {activeCatalog ? <IoMdClose size={20} /> : <MdMenu size={20} />}
          </button>
        </Popover>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-2 md:flex-row lg:hidden">
          <img className="max-w-[140px]" src={logo} alt="Logo" />
        </div>
        <Popover
          content={
            <div className="flex flex-col gap-3">
              <Popover
                content={<HeaderCategory setActiveCatalog={setActiveCatalog} />}
                placement="bottom"
                overlayStyle={{ width: '300px' }}
                overlayInnerStyle={{ padding: '10px 0px' }}
                arrow={false}
                open={isMobile && activeCatalog}
                onOpenChange={(value) => setActiveCatalog(value)}
                trigger="click"
              >
                <button className="flex items-center justify-between gap-2 px-4 py-2 border rounded-md border-primary text-primary">
                  <span className="font-bold">Каталог</span>
                  {activeCatalog ? <IoMdClose size={20} /> : <MdMenu size={20} />}
                </button>
              </Popover>

              <Button
                className="w-full"
                type="primary"
                size="large"
                onClick={() => navigate('/login')}
              >
                {token ? 'Выйти' : 'Войти'}
              </Button>
            </div>
          }
          placement="bottom"
          overlayStyle={{ width: '100%', padding: '5px 20px' }}
          arrow={false}
          trigger="click"
        >
          <button className="flex py-2 rounded-md custom-icon lg:hidden">
            <IoMdMenu />
          </button>
        </Popover>
      </div>

      <div className="relative max-w-[400px] w-full lg:block hidden">
        <IoSearchOutline className="absolute -translate-y-1/2 top-1/2 left-3" />
        <input
          className="py-3 px-3 pl-9 outline-none bg-[#f6f6f6] rounded-md placeholder:text-black w-full"
          placeholder="Поиск"
        />
      </div>
      <div className="flex items-center gap-3 lg:gap-5">
        <HeaderLang />
        <Popover
          content={
            <div className="relative">
              <IoSearchOutline className="absolute -translate-y-1/2 top-1/2 left-1" />
              <input
                className="pl-7 outline-none bg-[#fff] rounded-md placeholder:text-black w-full"
                placeholder="Поиск"
              />
            </div>
          }
          placement="bottom"
          overlayStyle={{ width: '100%', padding: '5px 20px' }}
          arrow={false}
          trigger="click"
        >
          <button className="flex py-2 rounded-md custom-icon lg:hidden">
            <IoSearchOutline />
          </button>
        </Popover>
        <button className="flex-col items-center justify-center hidden lg:flex">
          <CiBookmark size={24} />
          <span className="text-sm">Избранное</span>
        </button>
        <button className="px-3 py-2 rounded-md custom-icon lg:hidden">
          <CiBookmark />
        </button>

        <Button
          className="hidden w-28 lg:block"
          type="primary"
          size="large"
          onClick={() => navigate('/login')}
        >
          {token ? 'Выйти' : 'Войти'}
        </Button>
      </div>
    </header>
  );
};

export { Header };
