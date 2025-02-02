import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';

import { TAuthRegister } from 'src/services/auth/auth.types';
import { handleNumericInputKeyDown } from 'src/utils';

interface IAuthSignForm {
  form: FormInstance<any>;
  onFinish: (values: TAuthRegister) => void;
  isLoading: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AuthSignForm: React.FC<IAuthSignForm> = ({ form, onFinish, isLoading, setActiveIndex }) => {
  const { t } = useTranslation();
  return (
    <Form
      className="px-10"
      form={form}
      name="Sign"
      layout="vertical"
      onFinish={onFinish}
      size="large"
      autoComplete="off"
      requiredMark={false}
    >
      <div className="flex items-center gap-4 mb-5 -ml-5 lg:-ml-10">
        <button type="button" onClick={() => setActiveIndex((prev) => prev - 1)}>
          <LuArrowLeft size={24} />
        </button>
        <h2 className="text-2xl lg:text-3xl">{t('signTitle')}</h2>
      </div>
      <p className="mb-4 text-lg text-[#4e4e4e]">{t('signDesc')}</p>
      <Form.Item
        name="fullName"
        label={<h4 className="text-[#696F79] pb-1 text-base">{t('fullName')}</h4>}
        rules={[{ required: true, message: '' }]}
      >
        <Input placeholder={t('group')} />
      </Form.Item>
      <Form.Item
        name="phone"
        label={<h4 className="text-[#696F79] pb-1 text-base">{t('phone')}</h4>}
        rules={[{ required: true, message: '' }]}
      >
        <Input
          prefix="+998"
          placeholder="---------"
          maxLength={9}
          onKeyDown={handleNumericInputKeyDown}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={<h4 className="text-[#696F79] pb-1 text-base">{t('createPassword')}</h4>}
        rules={[{ required: true, message: '' }]}
      >
        <Input.Password placeholder={t('group')} />
      </Form.Item>
      <Form.Item
        name="passwordConfirm"
        label={<h4 className="text-[#696F79] pb-1 text-base">{t('repeatPassword')}</h4>}
        rules={[
          { required: true, message: '' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('confirmPasswordMessage')));
            },
          }),
        ]}
      >
        <Input.Password placeholder={t('group')} />
      </Form.Item>
      <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
        {t('sign')}
      </Button>
    </Form>
  );
};

export { AuthSignForm };
