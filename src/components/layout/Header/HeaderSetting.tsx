import { Avatar, Popover } from 'antd';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { UiMenu } from 'src/components/ui';
import { useAuthPersistStore } from 'src/store';

import { routes } from './routes';

const HeaderSetting: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const signOut = useAuthPersistStore((state) => state.signOut);
  const [open, setOpen] = React.useState(false);

  const onSelectMenuItem = (key: string) => {
    if (key === '/logout') {
      signOut();
    } else {
      navigate(key);
      setOpen(false);
    }
  };

  const content = (
    <div className="w-[300px] p-1">
      <h4 className="text-base font-bold">
        Доброе утро, <span className="font-normal">Atabek</span>
      </h4>
      <h6 className="text-xs text-[#697586] pb-2.5">Admin</h6>
      <UiMenu
        mode="inline"
        items={routes}
        selectedKeys={[pathname]}
        onSelect={(e) => onSelectMenuItem(e.key)}
      />
    </div>
  );

  return (
    <Popover
      open={open}
      trigger="click"
      placement="bottomLeft"
      content={content}
      onOpenChange={setOpen}
    >
      <div className="bg-[#e3f2fd] flex items-center gap-2.5 text-blue-500 text-xl cursor-pointer px-2.5 py-[5px] rounded-[27px] hover:bg-blue-500 hover:text-white">
        <Avatar className="relative z-50" />
        <FiSettings />
      </div>
    </Popover>
  );
};

export { HeaderSetting };
