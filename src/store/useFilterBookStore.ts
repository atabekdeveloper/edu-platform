import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IFilterBookState {
  title: string;
  categoryId: string;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
}

export const useFilterBookStore = create(
  devtools<IFilterBookState>((set) => ({
    title: '',
    categoryId: '',
    setTitle: (title) => set({ title }),
    setCategoryId: (categoryId) => set({ categoryId }),
  })),
);
