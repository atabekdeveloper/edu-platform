import { Form, Input, Select } from 'antd';
import React from 'react';
import { GlobalModal } from 'src/components/shareds';
import { TBookChange } from 'src/services/book/book.types';
import {
  useCreateBookMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUpdateBookMutation,
} from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

const BooksForm: React.FC = () => {
  const [form] = Form.useForm();
  const [uploadImageFile, setUploadImageFile] = React.useState<string>('');
  const [uploadPdfFile, setUploadPdfFile] = React.useState<string>('');
  const [uploadWorkPdfFile, setUploadWorkPdfFile] = React.useState<string>('');
  const paramsForm = useFormStorageStore((state) => state.paramsForm);

  const { data: tags } = useGetTagsQuery({ count: 100, page: 1 });
  const { data: category } = useGetCategoriesQuery({ count: 100, page: 1 });

  const onChangeUploadImage = (e: any) => setUploadImageFile(e.target.files[0]);
  const onChangeUploadPdf = (e: any) => setUploadPdfFile(e.target.files[0]);
  const onChangeUploadWorkPdf = (e: any) => setUploadWorkPdfFile(e.target.files[0]);

  const {
    mutate: createBook,
    isLoading: createLoading,
    isError: createError,
  } = useCreateBookMutation();
  const { mutate: editBook, isLoading: editLoading, isError: editError } = useUpdateBookMutation();

  const onFinish = (values: TBookChange) => {
    if (paramsForm) {
      editBook({ ...values, _id: paramsForm._id, image: uploadImageFile });
      return;
    }
    createBook({
      ...values,
      image: uploadImageFile,
      book: uploadPdfFile,
      workBook: uploadWorkPdfFile,
    });
  };

  React.useEffect(() => {
    if (paramsForm)
      form.setFieldsValue({
        ...paramsForm,
        categoryId: paramsForm.category._id,
        tagIds: paramsForm.tags.map((el: any) => el._id),
      });
  }, [paramsForm]);
  return (
    <GlobalModal
      form={form}
      isLoading={createLoading || editLoading}
      isError={createError || editError}
      width={500}
    >
      <Form name="Books Form" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
        <div className="flex gap-2">
          <Form.Item
            className="w-full"
            name="title"
            label="Название"
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            className="w-full"
            name="description"
            label="Описание"
            rules={[{ required: false, message: '' }]}
          >
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
            <Input.TextArea autoSize />
          </Form.Item>
        </div>
        <Form.Item
          className="w-full"
          name="categoryId"
          label="Категория"
          rules={[{ required: true, message: '' }]}
        >
          <Select
            placeholder="Выберите Категорию"
            options={category?.data.map((el) => ({ value: el._id, label: el.name }))}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="videos"
          label="Видео"
          rules={[{ required: false, message: '' }]}
        >
          <Select mode="tags" placeholder="Выберите несколько..." />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="tagIds"
          label="Теги"
          rules={[{ required: true, message: '' }]}
        >
          <Select
            mode="tags"
            placeholder="Выберите несколько..."
            options={tags?.data.map((el) => ({ value: el._id, label: el.name }))}
          />
        </Form.Item>
        <Form.Item label="Фото" name="image" rules={[{ required: false, message: '' }]}>
          <input onChange={onChangeUploadImage} accept=".jpg, .jpeg, .png" type="file" />
        </Form.Item>
        <Form.Item
          hidden={paramsForm}
          label="Основная книга"
          name="book"
          rules={[{ required: false, message: '' }]}
        >
          <input onChange={onChangeUploadPdf} accept=".pdf" type="file" />
        </Form.Item>
        <Form.Item
          hidden={paramsForm}
          label="Рабочая книга"
          name="workBook"
          rules={[{ required: false, message: '' }]}
        >
          <input onChange={onChangeUploadWorkPdf} accept=".pdf" type="file" />
        </Form.Item>
      </Form>
    </GlobalModal>
  );
};

export { BooksForm };
