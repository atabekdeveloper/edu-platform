import { BiCategory } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { IoBookOutline } from 'react-icons/io5';
import { PiUsers, PiUsersThree } from 'react-icons/pi';

export const routes = [
  {
    key: '/Users',
    label: 'Users',
    type: 'group',
  },
  {
    key: '/users',
    label: 'Пользователи',
    icon: <PiUsersThree />,
  },
  {
    key: '/admins',
    label: 'Админы',
    icon: <PiUsers />,
  },
  {
    key: '/Book',
    label: 'Book',
    type: 'group',
  },
  {
    key: '/books',
    label: 'Книги',
    icon: <IoBookOutline />,
  },
  {
    key: '/category',
    label: 'Категория',
    icon: <BiCategory />,
  },
  {
    key: '/tags',
    label: 'Теги',
    icon: <HiHashtag />,
  },
];
