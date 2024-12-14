import { MenuProps } from 'antd/lib/menu/menu';
import { useTranslation } from 'react-i18next';
import { FiSettings } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';

export const useRoutes = () => {
  const { t } = useTranslation();
  const routes: MenuProps['items'] = [
    {
      type: 'divider',
      style: { margin: '15px 0' },
    },
    {
      key: '/password',
      label: t('editPassword'),
      icon: <FiSettings />,
    },
    {
      key: '/logout',
      label: t('logout'),
      icon: <LuLogOut />,
    },
  ];
  return routes;
};
