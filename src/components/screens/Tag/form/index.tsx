import { Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalModal } from 'src/components/shareds';
import { useCreateTagMutation, useUpdateTagMutation } from 'src/services/index.api';
import { TTagChange } from 'src/services/tag/tag.types';
import { useFormStorageStore } from 'src/store';

const TagForm: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const {
    mutate: createTag,
    isLoading: createLoading,
    isError: createError,
  } = useCreateTagMutation();
  const { mutate: editTag, isLoading: editLoading, isError: editError } = useUpdateTagMutation();

  const paramsForm = useFormStorageStore((state) => state.paramsForm);

  const onFinish = (values: TTagChange) => {
    if (paramsForm) {
      editTag({ ...values, _id: paramsForm._id });
      return;
    }
    createTag(values);
  };

  React.useEffect(() => {
    if (paramsForm) form.setFieldsValue(paramsForm);
  }, [paramsForm]);
  return (
    <GlobalModal
      form={form}
      isLoading={createLoading || editLoading}
      isError={createError || editError}
      width={500}
    >
      <Form name="Tag Form" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item
          className="w-full"
          name="nameUz"
          label={`${t('title')} (O'zbekcha)`}
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="nameRu"
          label={`${t('title')} (Русский)`}
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="nameEng"
          label={`${t('title')} (English)`}
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
      </Form>
    </GlobalModal>
  );
};

export { TagForm };
