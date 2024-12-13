import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ILangPerisistState {
  lang: 'Uz' | 'Ru' | 'Eng';
  setLang: (tokens: { lang: 'Uz' | 'Ru' | 'Eng' }) => void;
}

export const useLangPersistStore = create(
  persist<ILangPerisistState>(
    (set) => ({
      lang: 'Ru',
      setLang: ({ lang }) => set({ lang }),
    }),
    {
      name: 'lang',
    },
  ),
);
