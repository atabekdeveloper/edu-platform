import { Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileInput, GlobalModal } from 'src/components/admin/shareds';
import { TBookChange } from 'src/services/book/book.types';
import {
  useCreateBookMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUpdateBookMutation,
} from 'src/services/index.api';
import { useFormStorageStore, useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter, handleNumericInputKeyDown } from 'src/utils';

const BooksForm: React.FC = () => {
  const [form] = Form.useForm();
  const paramsForm = useFormStorageStore((state) => state.paramsForm);
  const lang = useLangPersistStore((state) => state.lang);

  const { t } = useTranslation();

  const { data: tags } = useGetTagsQuery({ count: 100, page: 1 });
  const { data: category } = useGetCategoriesQuery({ count: 100, page: 1 });

  const {
    mutate: createBook,
    isLoading: createLoading,
    isError: createError,
  } = useCreateBookMutation();
  const { mutate: editBook, isLoading: editLoading, isError: editError } = useUpdateBookMutation();

  const onFinish = (values: TBookChange) => {
    const payload = {
      ...values,
      image: values.image?.file,
      book: values.book?.file,
      workBook: values.workBook?.file,
    };
    if (paramsForm) editBook({ ...values, _id: paramsForm._id, image: values.image?.file });
    else createBook(payload);
  };

  React.useEffect(() => {
    if (paramsForm) {
      form.setFieldsValue({
        ...paramsForm,
        categoryId: paramsForm.category._id,
        tagIds: paramsForm.tags.map((el: any) => el._id),
      });
    }
  }, [paramsForm, form]);

  return (
    <GlobalModal
      form={form}
      isLoading={createLoading || editLoading}
      isError={createError || editError}
      width={500}
    >
      <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
        {/* Input Section */}
        <div className="flex gap-2">
          <Form.Item
            className="w-full"
            name="title"
            label={t('title')}
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item className="w-full" name="description" label={t('desc')}>
            <Input.TextArea autoSize />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            className="w-full"
            name="author"
            label="Автор"
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            className="w-full"
            name="isbn"
            label="ISBN"
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber onKeyDown={handleNumericInputKeyDown} />
          </Form.Item>
        </div>
        {/* Select Section */}
        <Form.Item name="videos" label={t('video')} rules={[{ required: false, message: '' }]}>
          <Select mode="tags" />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label={t('category')}
          rules={[{ required: true, message: '' }]}
        >
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            options={category?.data.map((el: any) => ({
              value: el._id,
              label: el[`name${capitalizeFirstLetter(lang)}`],
            }))}
          />
        </Form.Item>
        <Form.Item name="tagIds" label={t('tags')} rules={[{ required: false, message: '' }]}>
          <Select
            mode="multiple"
            optionFilterProp="label"
            options={tags?.data.map((el: any) => ({
              value: el._id,
              label: el[`name${capitalizeFirstLetter(lang)}`],
            }))}
          />
        </Form.Item>
        <FileInput
          label={t('photo')}
          name="image"
          accept=".jpg, .jpeg, .png"
          required={!paramsForm}
        />
        <FileInput
          label={t('studentBook')}
          name="book"
          accept=".pdf"
          hidden={!!paramsForm}
          required
        />
        <FileInput
          label={t('workBook')}
          name="workBook"
          accept=".pdf"
          required={false}
          hidden={!!paramsForm}
        />
      </Form>
    </GlobalModal>
  );
};

export { BooksForm };
