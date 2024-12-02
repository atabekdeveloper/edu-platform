import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TRoleItemTypes } from 'src/services/index.types';

interface IAuthPerisistState {
  accessToken: string | null;
  roleName: TRoleItemTypes | null;
  signIn: (tokens: { accessToken: string; roleName: TRoleItemTypes }) => void;
  signOut: () => void;
}

export const useAuthPersistStore = create(
  persist<IAuthPerisistState>(
    (set) => ({
      accessToken: '',
      roleName: null,
      signIn: ({ accessToken, roleName }) => set({ accessToken, roleName }),
      signOut: () => set({ accessToken: null, roleName: null }),
    }),
    {
      name: 'token',
    },
  ),
);
