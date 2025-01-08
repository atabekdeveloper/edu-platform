import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoArrowRight } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { useEditUserMutation } from 'src/services/index.api';
import { TUserEditChange } from 'src/services/user/user.types';
import { useAuthPersistStore } from 'src/store';
import { formatPhoneStringJoin, handleNumericInputKeyDown } from 'src/utils';

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signOut, fullName, phone, roleName, signIn, accessToken } = useAuthPersistStore();

  const { mutate: editUser, isSuccess, isLoading, data: user } = useEditUserMutation();

  const onFinish = (values: TUserEditChange) => {
    editUser({ ...values, phone: formatPhoneStringJoin(values.phone) });
  };
  const onSignOut = () => {
    signOut();
    navigate('/');
  };
  const roleItems = [
    { value: 'student', title: t('student') },
    { value: 'teacher', title: t('teacher') },
    { value: 'parent', title: t('parent') },
  ];
  React.useEffect(() => {
    form.setFieldsValue({ fullName, phone: phone?.substring(4), role: roleName });
  }, []);
  React.useEffect(() => {
    if (isSuccess) {
      signIn({
        accessToken: `${accessToken}`,
        fullName: user.data.fullName,
        phone: user.data.phone,
        roleName: user.data.role,
        id: user.data._id,
      });
      navigate('/');
    }
  }, [isSuccess]);
  return (
    <section className="container">
      <div className="flex items-center gap-3 pb-7">
        <Link to="/">{t('main')}</Link>
        <span className="border border-black rounded-sm">
          <GoArrowRight />
        </span>
        <p>{t('profile')}</p>
      </div>
      <Form
        className="max-w-[500px]"
        form={form}
        name="Profile"
        layout="vertical"
        onFinish={onFinish}
        size="large"
        autoComplete="off"
        requiredMark={false}
      >
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
          name="role"
          label={<h4 className="text-[#696F79] pb-1 text-base">{t('role')}</h4>}
          rules={[{ required: true, message: '' }]}
        >
          <Select options={roleItems.map((el) => ({ value: el.value, label: el.title }))} />
        </Form.Item>
        <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
          {t('edit')}
        </Button>
        <Button className="mt-5" type="primary" block danger onClick={onSignOut}>
          {t('logout')}
        </Button>
      </Form>
    </section>
  );
};

export { Profile };
