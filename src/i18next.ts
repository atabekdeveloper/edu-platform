import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru, uz } from 'src/locales';

const lang = localStorage.getItem('lang');

i18n.use(initReactI18next).init({
  resources: { eng: en, ru, uz },
  lng: JSON.parse(`${lang}`)?.state?.lang || 'uz',
  fallbackLng: JSON.parse(`${lang}`)?.state?.lang || 'uz',
  react: { useSuspense: true },
  interpolation: { escapeValue: false },
});

export default i18n;
