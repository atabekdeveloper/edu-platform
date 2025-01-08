import { Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalModal } from 'src/components/admin/shareds';
import { useCreateAdminMutation } from 'src/services/index.api';
import { TUserChange } from 'src/services/user/user.types';
import { formatPhoneStringJoin, handleNumericInputKeyDown } from 'src/utils';

const AdminsForm: React.FC = () => {
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const {
    mutate: createAdmin,
    isLoading: createLoading,
    isError: createError,
  } = useCreateAdminMutation();

  const onFinish = (values: TUserChange) =>
    createAdmin({ ...values, phone: formatPhoneStringJoin(values.phone) });
  return (
    <GlobalModal form={form} isLoading={createLoading} isError={createError}>
      <Form name="Admins Form" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item name="phone" label={t('phone')} rules={[{ required: true, message: '' }]}>
          <Input
            prefix="+998"
            placeholder="---------"
            maxLength={9}
            onKeyDown={handleNumericInputKeyDown}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="password"
          label={t('password')}
          rules={[{ required: true, message: '' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="passwordConfirm"
          label={t('confirmPassword')}
          dependencies={['password']}
          rules={[
            { required: true, message: '' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароль, который вы ввели, не соответствует!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </GlobalModal>
  );
};

export { AdminsForm };
