import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IMyBookPerisistState {
  books: string[];
  toggleBookId: (books: { id: string }) => void;
}

export const useMyBookPersistStore = create(
  persist<IMyBookPerisistState>(
    (set) => ({
      books: [],
      toggleBookId: ({ id }) =>
        set((state) => ({
          books: state.books.includes(id)
            ? state.books.filter((bookId) => bookId !== id)
            : [...state.books, id],
        })),
    }),
    {
      name: 'books',
    },
  ),
);
