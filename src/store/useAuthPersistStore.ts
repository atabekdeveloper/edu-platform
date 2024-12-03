import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TRoleItemTypes } from 'src/services/index.types';

interface IAuthPerisistState {
  accessToken: string | null;
  roleName: TRoleItemTypes | null;
  phone: string | null;
  signIn: (tokens: { accessToken: string; roleName: TRoleItemTypes; phone: string }) => void;
  signOut: () => void;
}

export const useAuthPersistStore = create(
  persist<IAuthPerisistState>(
    (set) => ({
      accessToken: '',
      roleName: null,
      phone: '',
      signIn: ({ accessToken, roleName, phone }) => set({ accessToken, roleName, phone }),
      signOut: () => set({ accessToken: null, roleName: null, phone: null }),
    }),
    {
      name: 'token',
    },
  ),
);
