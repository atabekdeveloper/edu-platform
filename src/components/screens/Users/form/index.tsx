import { Form, Input } from 'antd';
import React from 'react';
import { GlobalModal } from 'src/components/shareds';
import { useUpdateUserAdminPasswordMutation } from 'src/services/index.api';
import { TUserChange } from 'src/services/user/user.types';
import { useFormStorageStore } from 'src/store';

const UsersForm: React.FC = () => {
  const [form] = Form.useForm();

  const {
    mutate: updatePassword,
    isLoading: editLoading,
    isError: editError,
  } = useUpdateUserAdminPasswordMutation();

  const paramsForm = useFormStorageStore((state) => state.paramsForm);

  const onFinish = (values: TUserChange) => {
    if (paramsForm) updatePassword({ ...values });
  };
  return (
    <GlobalModal form={form} isLoading={editLoading} isError={editError}>
      <Form name="Users Form" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item
          className="w-full"
          name="oldPassword"
          label="Старый пароль"
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="newPassword"
          label="Новый пароль"
          rules={[{ required: true, message: '' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="passwordConfirm"
          label="Подтвердить пароль"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Новый пароль, который вы ввели, не соответствует!'),
                );
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

export { UsersForm };
