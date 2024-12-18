import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import { UiPhoneIMaskInput } from 'src/components/admin/ui';
import { TAuthLogin } from 'src/services/auth/auth.types';

interface IAuthLoginForm {
  form: FormInstance<any>;
  onFinish: (values: TAuthLogin) => void;
  isLoading: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AuthLoginForm: React.FC<IAuthLoginForm> = ({ form, onFinish, isLoading, setActiveIndex }) => {
  return (
    <Form
      className="px-10"
      form={form}
      name="Login"
      layout="vertical"
      onFinish={onFinish}
      size="large"
      autoComplete="off"
      requiredMark={false}
    >
      <div className="flex items-center gap-4 mb-5 -ml-5 lg:-ml-10">
        <button type="button" onClick={() => setActiveIndex((prev) => prev + 1)}>
          <FiArrowRight size={24} />
        </button>
        <h2 className="text-2xl lg:text-3xl">Снова здравствуйте!</h2>
      </div>
      <p className="mb-4 text-lg text-[#4e4e4e]">Для входа введите данные</p>
      <Form.Item
        name="phone"
        label={<h4 className="text-[#696F79] pb-1 text-base">Номер телефона</h4>}
        rules={[{ required: true, message: '' }]}
      >
        <UiPhoneIMaskInput placeholder="Введите" />
      </Form.Item>
      <Form.Item
        name="password"
        label={<h4 className="text-[#696F79] pb-1 text-base">Пароль</h4>}
        rules={[{ required: true, message: '' }]}
      >
        <Input.Password placeholder="Введите" />
      </Form.Item>
      <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
        Войти
      </Button>
    </Form>
  );
};

export { AuthLoginForm };
