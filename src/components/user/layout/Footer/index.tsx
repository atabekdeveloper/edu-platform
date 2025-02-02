import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdEmail } from 'react-icons/md';
import { PiInstagramLogoFill, PiTelegramLogoBold } from 'react-icons/pi';

import logo from 'src/assets/images/logo.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-10 mt-5 border-t">
      <div className="container flex flex-col items-center justify-center gap-8 md:items-start md:flex-row md:justify-between">
        <img className="max-w-[140px]" src={logo} alt="Logo" />

        <div className="flex flex-col items-center gap-2">
          <p>{t('footerInfo')}</p>
          <a href="mailto:info@mycompany.com" className="text-xl font-bold hover:underline">
            pochta@gmail.com
          </a>
          <div className="flex justify-center gap-3 mt-2 text-3xl text-primary">
            <PiInstagramLogoFill />
            <PiTelegramLogoBold />
            <MdEmail />
          </div>
          <p>{t('footerTime')}</p>
        </div>

        <div>
          <p className="text-center md:text-left">{t('ring')}</p>
          <a href="tel:+998987897878" className="text-xl font-bold hover:underline">
            +998 98 789-78-78
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
