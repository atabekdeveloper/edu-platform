import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru, uz } from 'src/locales';

const lang = localStorage.getItem('lang');

i18n.use(initReactI18next).init({
  resources: { Eng: en, Ru: ru, Uz: uz },
  lng: JSON.parse(`${lang}`)?.state?.lang || 'Uz',
  fallbackLng: JSON.parse(`${lang}`)?.state?.lang || 'Uz',
  react: { useSuspense: true },
  interpolation: { escapeValue: false },
});

export default i18n;
