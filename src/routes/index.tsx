import {
  Home as AdminHome,
  Admins,
  Books,
  Category,
  NotFound,
  Tag,
  Users,
} from 'src/components/admin/screens';

import { Book, MyBook, Profile, Home as UserHome } from 'src/components/user/screens';

const adminRoutes = [
  { path: '/admin/', element: <AdminHome /> },
  { path: '/admin/users', element: <Users /> },
  { path: '/admin/admins', element: <Admins /> },
  { path: '/admin/category', element: <Category /> },
  { path: '/admin/tags', element: <Tag /> },
  { path: '/admin/books', element: <Books /> },
  { path: '*', element: <NotFound /> },
];

const userRoutes = [
  { path: '/', element: <UserHome /> },
  { path: '/:id', element: <Book /> },
  { path: '/mybook', element: <MyBook /> },
  { path: '/profile', element: <Profile /> },
  { path: '*', element: <NotFound /> },
];

export { adminRoutes, userRoutes };
