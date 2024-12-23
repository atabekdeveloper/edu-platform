import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLangPersistStore } from 'src/store';

import { Popover } from 'antd';
import ru from 'src/assets/images/lang/russian.png';
import eng from 'src/assets/images/lang/united-kingdom.png';
import uz from 'src/assets/images/lang/uzbekistan.png';

const langItems = [
  { value: 'uz', img: uz, label: "O'zbekcha" },
  { value: 'ru', img: ru, label: 'Русский' },
  { value: 'eng', img: eng, label: 'English' },
];

const HeaderLang: React.FC = () => {
  const { i18n } = useTranslation();
  const [showLang, setShowLang] = React.useState(false);

  const { lang, setLang } = useLangPersistStore();

  const handleChangeLang = (value: 'uz' | 'ru' | 'eng') => {
    i18n.changeLanguage(value);
    setLang({ lang: value });
    setShowLang(false);
  };
  return (
    <Popover
      content={
        <ul className="flex flex-col gap-3">
          {langItems.map((el) => (
            <li
              key={el.value}
              className="flex items-center justify-between gap-3 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
              onClick={() => handleChangeLang(el.value as any)}
            >
              <span className="uppercase">{el.label}</span>
              <img className="w-5 h-5" src={el.img} alt={lang} />
            </li>
          ))}
        </ul>
      }
      open={showLang}
      onOpenChange={(value) => setShowLang(value)}
      placement="bottom"
      arrow={false}
      trigger="click"
    >
      <button className="flex items-center gap-2 px-3 py-1 border rounded-md lg:py-2">
        <span className="uppercase">{lang}</span>
        <img className="w-5 h-5" src={langItems.find((el) => el.value === lang)?.img} alt={lang} />
      </button>
    </Popover>
  );
};

export { HeaderLang };
