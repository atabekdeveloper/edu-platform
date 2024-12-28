import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TRoleItemTypes } from 'src/services/index.types';

interface IAuthPerisistState {
  accessToken: string | null;
  roleName: TRoleItemTypes | null;
  phone: string | null;
  fullName: string | null;
  signIn: (tokens: {
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
      accessToken: '',
      roleName: null,
      phone: '',
      fullName: '',
      signIn: ({ accessToken, roleName, phone, fullName }) =>
        set({ accessToken, roleName, phone, fullName }),
      signOut: () => set({ accessToken: null, roleName: null, phone: null, fullName: null }),
    }),
    {
      name: 'token',
    },
  ),
);
