import { useTranslation } from 'react-i18next';
import { BiCategory } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { IoBookOutline } from 'react-icons/io5';
import { PiUsers, PiUsersThree } from 'react-icons/pi';

export const useRoutes = () => {
  const { t } = useTranslation();
  const routes = [
    {
      key: '/Users',
      label: t('users'),
      type: 'group',
    },
    {
      key: '/admin/users',
      label: t('users'),
      icon: <PiUsersThree />,
    },
    {
      key: '/admin/admins',
      label: t('admins'),
      icon: <PiUsers />,
    },
    {
      key: '/Book',
      label: t('books'),
      type: 'group',
    },
    {
      key: '/admin/books',
      label: t('books'),
      icon: <IoBookOutline />,
    },
    {
      key: '/admin/category',
      label: t('category'),
      icon: <BiCategory />,
    },
    {
      key: '/admin/tags',
      label: t('tags'),
      icon: <HiHashtag />,
    },
  ];
  return routes;
};
