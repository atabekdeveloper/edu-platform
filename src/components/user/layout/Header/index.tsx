import { Button, Popover } from 'antd';
import React from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logo from 'src/assets/images/logo.svg';
import { useAuthPersistStore, useFilterBookStore } from 'src/store';
import { HeaderLang } from './HeaderLang';

const Header: React.FC = () => {
  const { title, setTitle } = useFilterBookStore();
  const token = useAuthPersistStore((state) => state.accessToken);
  const navigate = useNavigate();
  return (
    <header className="container relative flex justify-between gap-5 py-7">
      <div className="items-center hidden gap-5 lg:flex">
        <div className="items-center hidden gap-2 lg:flex">
          <img className="max-w-[140px]" src={logo} alt="Logo" />
          <h3 className="text-primary">EDU Platform</h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-2 md:flex-row lg:hidden">
          <img className="max-w-[140px]" src={logo} alt="Logo" />
        </div>
        <Popover
          content={
            <div className="relative">
              <IoSearchOutline className="absolute -translate-y-1/2 top-1/2 left-1" />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
      </div>

      <div className="relative max-w-[400px] w-full lg:block hidden">
        <IoSearchOutline className="absolute -translate-y-1/2 top-1/2 left-3" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-3 px-3 pl-9 outline-none bg-[#f6f6f6] rounded-md placeholder:text-black w-full"
          placeholder="Поиск"
        />
      </div>
      <div className="flex items-center gap-3 lg:gap-5">
        <HeaderLang />
        <button className="flex-col items-center justify-center hidden lg:flex">
          <CiBookmark size={24} />
          <span className="text-sm">Избранное</span>
        </button>
        <button className="px-3 py-2 rounded-md custom-icon lg:hidden">
          <CiBookmark />
        </button>

        <Button
          className="w-20 lg:w-28"
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
