import { MenuProps } from 'antd/lib/menu/menu';
import { FiSettings } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';

export const routes: MenuProps['items'] = [
  {
    type: 'divider',
    style: { margin: '15px 0' },
  },
  {
    key: '/password',
    label: 'Изменить пароль',
    icon: <FiSettings />,
  },
  {
    key: '/logout',
    label: 'Выход',
    icon: <LuLogOut />,
  },
];
