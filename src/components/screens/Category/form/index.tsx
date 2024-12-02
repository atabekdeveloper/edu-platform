import { Form, Input } from 'antd';
import React from 'react';
import { GlobalModal } from 'src/components/shareds';
import { TCategoryChange } from 'src/services/category/category.types';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

const CategoryForm: React.FC = () => {
  const [form] = Form.useForm();

  const {
    mutate: createCategory,
    isLoading: createLoading,
    isError: createError,
  } = useCreateCategoryMutation();
  const {
    mutate: editCategory,
    isLoading: editLoading,
    isError: editError,
  } = useUpdateCategoryMutation();

  const paramsForm = useFormStorageStore((state) => state.paramsForm);

  const onFinish = (values: TCategoryChange) => {
    if (paramsForm) {
      editCategory({ ...values, _id: paramsForm._id });
      return;
    }
    createCategory(values);
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
      <Form
        name="Category Form"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
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

export { CategoryForm };
