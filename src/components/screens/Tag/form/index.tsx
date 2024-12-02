import { Form, Input } from 'antd';
import React from 'react';
import { GlobalModal } from 'src/components/shareds';
import { useCreateTagMutation, useUpdateTagMutation } from 'src/services/index.api';
import { TTagChange } from 'src/services/tag/tag.types';
import { useFormStorageStore } from 'src/store';

const TagForm: React.FC = () => {
  const [form] = Form.useForm();

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
          name="name"
          label="Название"
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
      </Form>
    </GlobalModal>
  );
};

export { TagForm };
