import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';

interface IAuthAgeForm {
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AuthAgeForm: React.FC<IAuthAgeForm> = ({ setActiveIndex, age, setAge }) => {
  const { t } = useTranslation();
  const ageItems = [
    { value: '14', label: t('fourteenth') },
    { value: '14-25', label: '14-25' },
    { value: '26-40', label: '26-40' },
    { value: '41-59', label: '41-59' },
    { value: '60', label: '60+' },
  ];
  return (
    <div className="px-10">
      <div className="flex items-center gap-4 mb-5 -ml-5 lg:-ml-10">
        <button type="button" onClick={() => setActiveIndex((prev) => prev - 1)}>
          <LuArrowLeft size={24} />
        </button>
        <h2 className="text-2xl lg:text-3xl">{t('yourAge')}</h2>
      </div>
      <ul className="flex flex-col gap-5 mb-3">
        {ageItems.map((el) => (
          <li
            key={el.value}
            className={`w-full flex items-center justify-between bg-[#f5f9ff] border py-3 px-6 rounded-md cursor-pointer ${
              el.value === age && 'border-primary'
            }`}
            onClick={() => setAge(el.value)}
          >
            <span className="text-xl">{el.label}</span>
            <span
              className={`w-8 h-8 border rounded-full ${
                el.value === age ? 'bg-primary' : 'bg-white'
              }`}
            ></span>
          </li>
        ))}
      </ul>
      <Button
        className="py-7"
        size="large"
        type="primary"
        block
        disabled={!age}
        onClick={() => setActiveIndex((prev) => prev + 1)}
      >
        {t('select')}
      </Button>
    </div>
  );
};

export { AuthAgeForm };
