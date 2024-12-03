import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/images/full_logo.svg';
import { UiPhoneIMaskInput } from 'src/components/ui';
import { TAuthLogin } from 'src/services/auth/auth.types';
import { useAuthLoginMutation } from 'src/services/index.api';
import { useAuthPersistStore } from 'src/store';
import { formatPhoneStringJoin, formMessage } from 'src/utils';

const AuthLogin: React.FC = () => {
  const [form] = Form.useForm();
  const signIn = useAuthPersistStore((state) => state.signIn);
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess, data: loginData } = useAuthLoginMutation();

  const onFinish = (values: TAuthLogin) => {
    const formattedPhone = formatPhoneStringJoin(values.phone);
    mutate({ ...values, phone: formattedPhone });
  };

  useEffect(() => {
    if (isSuccess && loginData) {
      const { token } = loginData.meta;
      signIn({
        accessToken: token?.access as string,
        roleName: loginData.data.role,
        phone: loginData.data.phone,
      });
      form.resetFields();
      navigate('/users');
    }
  }, [isSuccess, loginData, signIn, navigate, form]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="px-6 py-10 bg-white rounded-lg max-w-[450px] w-full">
          <div className="flex flex-col items-center gap-1 mb-10 text-center">
            <img src={logo} alt="Logo" className="w-[120px] mb-10" />
            <h1 className="mb-2 text-xl font-bold md:text-2xl text-primary">
              Привет, с возвращением
            </h1>
            <p className="text-sm text-gray-500">Введите свои учетные данные, чтобы продолжить</p>
          </div>
          <Form
            form={form}
            name="Login"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="phone" rules={[{ required: true, message: formMessage('Телефон') }]}>
              <UiPhoneIMaskInput />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: formMessage('Пароль') }]}>
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <div className="flex items-center justify-between mb-6">
              <Checkbox className="mr-2">Запомнить меня</Checkbox>
              <a href="#" className="text-sm text-primary hover:underline hover:text-primary">
                Забыли пароль?
              </a>
            </div>
            <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { AuthLogin };
