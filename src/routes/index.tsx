import {
  Admins,
  Books,
  Category,
  Home,
  NotFound,
  Profile,
  Tag,
  Users,
} from 'src/components/screens';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/profile', element: <Profile /> },
  { path: '/users', element: <Users /> },
  { path: '/admins', element: <Admins /> },
  { path: '/category', element: <Category /> },
  { path: '/tags', element: <Tag /> },
  { path: '/books', element: <Books /> },
  { path: '*', element: <NotFound /> },
];

export { routes };
