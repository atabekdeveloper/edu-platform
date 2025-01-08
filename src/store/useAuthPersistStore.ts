import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TRoleItemTypes } from 'src/services/index.types';

interface IAuthPerisistState {
  id: string | null;
  accessToken: string | null;
  roleName: TRoleItemTypes | null;
  phone: string | null;
  fullName: string | null;
  signIn: (tokens: {
    id: string;
    accessToken: string;
    roleName: TRoleItemTypes;
    phone: string;
    fullName: string;
  }) => void;
  signOut: () => void;
}

export const useAuthPersistStore = create(
  persist<IAuthPerisistState>(
    (set) => ({
      id: null,
      accessToken: '',
      roleName: null,
      phone: '',
      fullName: '',
      signIn: ({ accessToken, roleName, phone, fullName, id }) =>
        set({ accessToken, roleName, phone, fullName, id }),
      signOut: () =>
        set({ accessToken: null, roleName: null, phone: null, fullName: null, id: null }),
    }),
    {
      name: 'token',
    },
  ),
);
