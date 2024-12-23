import React from 'react';
import { MdEmail } from 'react-icons/md';
import { PiInstagramLogoFill, PiTelegramLogoBold } from 'react-icons/pi';

import logo from 'src/assets/images/logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 mt-5 border-t">
      <div className="container flex items-start justify-between">
        <div className="items-center hidden gap-2 lg:flex">
          <img className="max-w-[140px]" src={logo} alt="Logo" />
          <h3 className="text-primary">EDU Platform</h3>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p>Остались вопросы? Напишите нам</p>
          <a href="mailto:info@mycompany.com" className="text-xl font-bold">
            pochta@gmail.com
          </a>
          <div className="flex justify-center gap-3 mt-2 text-3xl text-primary">
            <PiInstagramLogoFill />
            <PiTelegramLogoBold />
            <MdEmail />
          </div>
          <p>Мы на связи с 9 до 18 часов</p>
        </div>

        <div>
          <p>Звонок</p>
          <a href="tel:+998987897878" className="text-xl font-bold hover:underline">
            +998 98 789-78-78
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
