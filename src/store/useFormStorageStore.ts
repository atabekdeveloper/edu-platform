import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IFormStorageState {
  paramsForm: any;
  isModal: boolean;
  toggleModal: () => void;
  setParamsForm: (params: any) => void;
  setParamsItem: (params: any) => void;
}

export const useFormStorageStore = create(
  devtools<IFormStorageState>((set) => ({
    paramsForm: null,
    isModal: false,
    toggleModal: () => set((state) => ({ isModal: !state.isModal })),
    setParamsForm: (params) => set({ paramsForm: params, isModal: true }),
    setParamsItem: (params) => set({ paramsForm: params }),
  })),
);
