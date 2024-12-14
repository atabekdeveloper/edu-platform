import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLangPersistStore } from 'src/store';

const HeaderLang: React.FC = () => {
  const { i18n } = useTranslation();

  const { lang, setLang } = useLangPersistStore();

  const handleChangeLang = (value: 'Uz' | 'Ru' | 'Eng') => {
    i18n.changeLanguage(value);
    setLang({ lang: value });
  };
  return (
    <Select
      className="w-28"
      value={lang}
      onChange={handleChangeLang}
      options={[
        { value: 'Uz', label: "O'zbekcha" },
        { value: 'Ru', label: 'Русский' },
        { value: 'Eng', label: 'English' },
      ]}
    />
  );
};

export { HeaderLang };
