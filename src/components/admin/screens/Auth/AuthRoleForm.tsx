import React from 'react';
import { FiArrowRight, FiUsers } from 'react-icons/fi';
import { PiSuitcase } from 'react-icons/pi';
import { TbUser } from 'react-icons/tb';

const roleItems = [
  { value: 'parent', title: 'Студент', desc: 'Описание', icon: <TbUser size={20} /> },
  { value: 'teacher', title: 'Учитель', desc: 'Описание', icon: <PiSuitcase size={20} /> },
  { value: 'student', title: 'Родитель', desc: 'Описание', icon: <FiUsers size={20} /> },
];
interface IAuthRoleForm {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AuthRoleForm: React.FC<IAuthRoleForm> = ({ setActiveIndex, role, setRole }) => {
  return (
    <div className="px-10">
      <div className="flex flex-col gap-2 mb-5">
        <h2 className="text-2xl lg:text-3xl">Добро пожаловать!</h2>
        <p className="text-[#4e4e4e]">
          Перед началом нашего совместного путешествия, пожалуйста, расскажи о себе!
        </p>
      </div>
      <ul className="flex flex-col gap-5 mb-3">
        {roleItems.map((el) => (
          <li
            key={el.value}
            className={`w-full flex items-center justify-between py-5 border px-6 rounded-md cursor-pointer ${
              el.value === role ? 'border-primary bg-[#f5f9ff]' : 'bg-white'
            }`}
            onClick={() => setRole(el.value)}
          >
            <div className="flex items-center gap-7">
              <div className="relative w-[52px] h-[52px]">
                <div
                  className="relative bg-primary w-[52px] h-[52px]"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  }}
                ></div>
                <div
                  className={`absolute w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-primary flex items-center justify-center ${
                    el.value === role ? 'bg-primary text-white' : 'bg-white'
                  }`}
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  }}
                >
                  {el.icon}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl">{el.title}</h3>
                <p className="text-base text-[#8692A6]">{el.desc}</p>
              </div>
            </div>
            <button
              className="text-primary"
              onClick={() => setActiveIndex((prev) => prev + 1)}
              hidden={el.value !== role}
            >
              <FiArrowRight size={32} />
            </button>
          </li>
        ))}
      </ul>
      <div className="pt-2 text-xl text-center">
        <span className="text-[#8692A6] pr-2">Уже есть аккаунт?</span>
        <span
          className="cursor-pointer text-primary"
          onClick={() => setActiveIndex((prev) => prev - 1)}
        >
          Войти
        </span>
      </div>
    </div>
  );
};

export { AuthRoleForm };
