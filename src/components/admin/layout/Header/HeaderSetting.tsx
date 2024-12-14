import { Avatar, Popover } from 'antd';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { UiMenu } from 'src/components/admin/ui';
import { useAuthPersistStore, useToggleStore } from 'src/store';

import { RiAdminLine } from 'react-icons/ri';
import { useRoutes } from './routes';

const HeaderSetting: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const routes = useRoutes();

  const { signOut, roleName, phone } = useAuthPersistStore((state) => state);
  const toggleModal = useToggleStore((state) => state.toggleModal);

  const onSelectMenuItem = (key: string) => {
    if (key === '/logout') signOut();
    if (key === '/password') toggleModal();
    else navigate(key);
    setOpen(false);
  };

  const content = (
    <div className="w-[300px] p-1">
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-bold uppercase">{roleName}</h4>
        <h6 className="text-xs text-[#697586]">{phone}</h6>
      </div>
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
        <Avatar icon={<RiAdminLine />} />
        <FiSettings />
      </div>
    </Popover>
  );
};

export { HeaderSetting };
