import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseOutline } from 'react-icons/io5';
import { useUpdateUserAdminPasswordMutation } from 'src/services/index.api';
import { TUserChange } from 'src/services/user/user.types';
import { useToggleStore } from 'src/store';

const UpdatePasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  const isModal = useToggleStore((state) => state.isModal);
  const toggleModal = useToggleStore((state) => state.toggleModal);

  const { t } = useTranslation();

  const { mutate: updatePassword, isLoading, isError } = useUpdateUserAdminPasswordMutation();

  const onFinish = (values: TUserChange) => updatePassword({ ...values });

  const onCloseModal = () => {
    if (isModal) toggleModal();
    form.resetFields();
  };

  React.useEffect(() => {
    if (!isLoading && !isError) onCloseModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);
  return (
    <Modal
      open={isModal}
      centered
      closeIcon={<IoCloseOutline />}
      title={t('editPassword')}
      footer={
        <div className="flex flex-col gap-3 pt-3 border-t border-[#D9D9D9]">
          <Button type="primary" onClick={form.submit} loading={isLoading}>
            {t('save')}
          </Button>
        </div>
      }
      onCancel={onCloseModal}
    >
      <Form
        name="Update User Form"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          className="w-full"
          name="oldPassword"
          label={t('oldPassword')}
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="newPassword"
          label={t('newPassword')}
          rules={[{ required: true, message: '' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="passwordConfirm"
          label={t('confirmPassword')}
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
    </Modal>
  );
};

export { UpdatePasswordForm };
