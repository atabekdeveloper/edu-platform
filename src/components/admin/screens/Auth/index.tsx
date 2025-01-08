import { Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TAuthLogin, TAuthRegister } from 'src/services/auth/auth.types';
import { useAuthLoginMutation, useAuthSignMutation } from 'src/services/index.api';
import { useAuthPersistStore, useLangPersistStore } from 'src/store';
import { formatPhoneStringJoin } from 'src/utils';

import { useTranslation } from 'react-i18next';
import banner from 'src/assets/images/banner/banner.png';
import edge from 'src/assets/images/icons/edge.svg';
import stuck from 'src/assets/images/icons/stuck.svg';
import logo from 'src/assets/images/white_logo.svg';
import { TRoleItemTypes } from 'src/services/index.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AuthAgeForm } from './AuthAgeForm';
import { AuthLoginForm } from './AuthLoginForm';
import { AuthRoleForm } from './AuthRoleForm';
import { AuthSignForm } from './AuthSignForm';

const AuthLogin: React.FC = () => {
  const [formSign] = Form.useForm();
  const [formLogin] = Form.useForm();
  const signIn = useAuthPersistStore((state) => state.signIn);
  const navigate = useNavigate();
  const { lang, setLang } = useLangPersistStore();

  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = React.useState(1);
  const [age, setAge] = React.useState('');
  const [role, setRole] = React.useState('');
  const swiperRef = React.useRef<any>(null);

  const {
    mutate: login,
    isLoading: loginLoading,
    isSuccess: loginSuccess,
    data: loginData,
  } = useAuthLoginMutation();
  const {
    mutate: sign,
    isLoading: signLoading,
    isSuccess: signSuccess,
    data: signData,
  } = useAuthSignMutation();

  const onFinishSign = (values: TAuthRegister) => {
    sign({
      ...values,
      phone: formatPhoneStringJoin(values.phone),
      age,
      role: role as TRoleItemTypes,
    });
  };
  const onFinishLogin = (values: TAuthLogin) => {
    login({ ...values, phone: formatPhoneStringJoin(values.phone) });
  };

  React.useEffect(() => {
    if (loginSuccess) {
      const { token } = loginData.meta;
      signIn({
        accessToken: token?.access as string,
        roleName: loginData.data.role,
        phone: loginData.data.phone,
        fullName: loginData.data.fullName,
        id: loginData.data._id,
      });
      formLogin.resetFields();
      if (loginData.data.role === 'admin') navigate('/admin/users');
      else navigate('/');
    }
  }, [loginSuccess]);
  React.useEffect(() => {
    if (signSuccess) {
      const { token } = signData.meta;
      signIn({
        accessToken: token?.access as string,
        roleName: signData.data.role,
        phone: signData.data.phone,
        fullName: signData.data.fullName,
        id: signData.data._id,
      });
      formLogin.resetFields();
      navigate('/');
    }
  }, [signSuccess]);

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex); // Устанавливаем слайд при изменении activeIndex
    }
  }, [activeIndex]);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="flex-[0_1_58%] relative items-center justify-center hidden lg:flex">
        <img className="absolute object-cover w-full h-full" src={banner} alt="Banner" />
        <div className="absolute w-full h-full bg-primary/60"></div>
        <div className="relative max-w-[550px] px-5 xl:max-w-[750px]">
          <div className="pb-16">
            <img className="w-full max-w-[150px]" src={logo} alt="Logo" />
          </div>
          <div className="relative text-white">
            <img className="absolute top-0 left-0" src={stuck} alt="Stuck" />
            <img className="absolute bottom-0 right-0" src={edge} alt="Edge" />
            <p className="pb-16 text-3xl pt-14">
              Если деньги – это ваша единственная надежда на независимость, вы никогда не получите
              ее. Единственная реальная защита в этом мире, которую может иметь человек, – это запас
              знаний, опыта и способностей.
            </p>
            <h4 className="absolute bottom-0 text-2xl">Генри Форд</h4>
          </div>
        </div>
      </div>
      <div className="flex-auto lg:flex-[0_1_42%] flex items-center justify-center overflow-hidden">
        <div className="max-w-[550px] w-full">
          <div className="flex flex-col items-center justify-center gap-1 px-5 pb-2 lg:flex-row lg:justify-between lg:pb-16">
            <a
              className="cursor-pointer text-primary hover:underline"
              onClick={() => navigate('/')}
            >
              {t('main')}
            </a>
            <div className="flex justify-center gap-3 lg:justify-end text-primary">
              <button
                className={`${lang === 'ru' && 'underline'}`}
                onClick={() => setLang({ lang: 'ru' })}
              >
                Ru
              </button>
              <span>|</span>
              <button
                className={`${lang === 'eng' && 'underline'}`}
                onClick={() => setLang({ lang: 'eng' })}
              >
                En
              </button>
              <span>|</span>
              <button
                className={`${lang === 'uz' && 'underline'}`}
                onClick={() => setLang({ lang: 'uz' })}
              >
                Uz
              </button>
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={50}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <SwiperSlide>
              <AuthLoginForm
                form={formLogin}
                onFinish={onFinishLogin}
                setActiveIndex={setActiveIndex}
                isLoading={loginLoading}
              />
            </SwiperSlide>
            <SwiperSlide>
              <AuthRoleForm role={role} setRole={setRole} setActiveIndex={setActiveIndex} />
            </SwiperSlide>
            <SwiperSlide>
              <AuthAgeForm age={age} setAge={setAge} setActiveIndex={setActiveIndex} />
            </SwiperSlide>
            <SwiperSlide>
              <AuthSignForm
                form={formSign}
                isLoading={signLoading}
                onFinish={onFinishSign}
                setActiveIndex={setActiveIndex}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export { AuthLogin };
