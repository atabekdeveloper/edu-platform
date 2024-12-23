import { Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TAuthLogin, TAuthRegister } from 'src/services/auth/auth.types';
import { useAuthLoginMutation, useAuthSignMutation } from 'src/services/index.api';
import { useAuthPersistStore, useLangPersistStore } from 'src/store';
import { formatPhoneStringJoin } from 'src/utils';

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
  const setLang = useLangPersistStore((state) => state.setLang);

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
    const formattedPhone = formatPhoneStringJoin(values.phone);
    sign({ ...values, phone: formattedPhone, age, role: role as TRoleItemTypes });
  };
  const onFinishLogin = (values: TAuthLogin) => {
    const formattedPhone = formatPhoneStringJoin(values.phone);
    login({ ...values, phone: formattedPhone });
  };

  React.useEffect(() => {
    if (loginSuccess) {
      const { token } = loginData.meta;
      signIn({
        accessToken: token?.access as string,
        roleName: loginData.data.role,
        phone: loginData.data.phone,
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
        <div className="absolute w-full h-full bg-[#175EC3]/60"></div>
        <div className="relative max-w-[550px] px-5 xl:max-w-[750px]">
          <div className="flex items-center gap-3 mb-20 text-3xl text-white">
            <img src={logo} alt="Logo" />
            <h2>EDU Platform</h2>
          </div>
          <div className="relative text-white">
            <img className="absolute top-0 left-0" src={stuck} alt="Stuck" />
            <img className="absolute bottom-0 right-0" src={edge} alt="Edge" />
            <p className="pb-16 text-3xl pt-14">
              Lorem ipsum dolor sit amet consectetur. Dui eget sociis urna est facilisis ultricies
              sit dolor elementum. Vel elementum faucibus molestie ut eget facilisis. Vel venenatis
              metus leo rhoncus metus ut ipsum metus viverra. Commodo et lectus libero nisl id
              aenean purus turpis nunc.
            </p>
            <h4 className="absolute bottom-0 text-2xl">Автор цитаты</h4>
          </div>
        </div>
      </div>
      <div className="flex-auto lg:flex-[0_1_42%] flex items-center justify-center overflow-hidden">
        <div className="max-w-[550px] w-full">
          <div className="flex justify-center gap-3 pb-5 lg:pb-16 lg:justify-end text-primary">
            <button onClick={() => setLang({ lang: 'ru' })}>Ru</button>
            <span>|</span>
            <button onClick={() => setLang({ lang: 'eng' })}>En</button>
            <span>|</span>
            <button onClick={() => setLang({ lang: 'uz' })}>Uz</button>
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
