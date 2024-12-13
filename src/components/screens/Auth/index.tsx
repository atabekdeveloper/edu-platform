import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/images/full_logo.svg';
import { UiPhoneIMaskInput } from 'src/components/ui';
import { TAuthLogin } from 'src/services/auth/auth.types';
import { useAuthLoginMutation } from 'src/services/index.api';
import { useAuthPersistStore } from 'src/store';
import { formatPhoneStringJoin } from 'src/utils';

const AuthLogin: React.FC = () => {
  const [form] = Form.useForm();
  const signIn = useAuthPersistStore((state) => state.signIn);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { mutate: login, isLoading, isSuccess, data: loginData } = useAuthLoginMutation();

  const onFinish = (values: TAuthLogin) => {
    const formattedPhone = formatPhoneStringJoin(values.phone);
    login({ ...values, phone: formattedPhone });
  };

  React.useEffect(() => {
    if (isSuccess) {
      const { token } = loginData.meta;
      signIn({
        accessToken: token?.access as string,
        roleName: loginData.data.role,
        phone: loginData.data.phone,
      });
      form.resetFields();
      navigate('/users');
    }
  }, [isSuccess]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="px-6 py-10 bg-white rounded-lg max-w-[450px] w-full">
          <div className="flex flex-col items-center gap-1 mb-10 text-center">
            <img src={logo} alt="Logo" className="w-[120px] mb-10" />
            <h1 className="mb-2 text-xl font-bold md:text-2xl text-primary">{t('greetings')}</h1>
            <p className="text-sm text-gray-500">{t('greetingsTitle')}</p>
          </div>
          <Form
            form={form}
            name="Login"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="phone" rules={[{ required: true, message: '' }]}>
              <UiPhoneIMaskInput />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '' }]}>
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
              {t('login')}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { AuthLogin };
