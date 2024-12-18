import { Select } from 'antd';
import React from 'react';
import { useLangPersistStore } from 'src/store';

const HeaderLang: React.FC = () => {
  const { lang, setLang } = useLangPersistStore();

  const handleChangeLang = (value: 'uz' | 'ru' | 'eng') => setLang({ lang: value });
  return (
    <Select
      className="w-28"
      value={lang}
      onChange={handleChangeLang}
      options={[
        { value: 'uz', label: "O'zbekcha" },
        { value: 'ru', label: 'Русский' },
        { value: 'eng', label: 'English' },
      ]}
    />
  );
};

export { HeaderLang };
