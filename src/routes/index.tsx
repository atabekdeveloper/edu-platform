import {
  Home as AdminHome,
  Admins,
  Books,
  Category,
  NotFound,
  Tag,
  Users,
} from 'src/components/admin/screens';

import { Home as UserHome } from 'src/components/user/screens/Home';

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
  { path: '*', element: <NotFound /> },
];

export { adminRoutes, userRoutes };
