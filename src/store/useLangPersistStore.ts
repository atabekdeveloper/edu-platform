import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ILangPerisistState {
  lang: 'uz' | 'ru' | 'eng';
  setLang: (tokens: { lang: 'uz' | 'ru' | 'eng' }) => void;
}

export const useLangPersistStore = create(
  persist<ILangPerisistState>(
    (set) => ({
      lang: 'uz',
      setLang: ({ lang }) => set({ lang }),
    }),
    {
      name: 'lang',
    },
  ),
);
