import type { InputRef } from 'antd';
import { Button, Divider, Form, Input, Select } from 'antd';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FileInput, GlobalModal } from 'src/components/shareds';
import { TBookChange } from 'src/services/book/book.types';
import {
  useCreateBookMutation,
  useCreateCategoryMutation,
  useCreateTagMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUpdateBookMutation,
} from 'src/services/index.api';
import { useFormStorageStore } from 'src/store';

const BooksForm: React.FC = () => {
  const [form] = Form.useForm();
  const paramsForm = useFormStorageStore((state) => state.paramsForm);
  const inputRef = React.useRef<InputRef>(null);
  const [name, setName] = React.useState('');
  const [files, setFiles] = React.useState({
    image: '',
    pdf: '',
    workPdf: '',
  });

  const { data: tags } = useGetTagsQuery({ count: 100, page: 1 });
  const { data: category } = useGetCategoriesQuery({ count: 100, page: 1 });

  const {
    mutate: createBook,
    isLoading: createLoading,
    isError: createError,
  } = useCreateBookMutation();
  const { mutate: editBook, isLoading: editLoading, isError: editError } = useUpdateBookMutation();
  const {
    mutate: createTag,
    isSuccess: tagSuccess,
    isLoading: tagLoading,
  } = useCreateTagMutation();
  const {
    mutate: createCategory,
    isSuccess: categorySuccess,
    isLoading: categoryLoading,
  } = useCreateCategoryMutation();

  const handleFileChange = (key: keyof typeof files) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFiles((prev) => ({ ...prev, [key]: e.target.files?.[0] || '' }));

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (type: string) => {
    if (type === 'tag') createTag({ name });
    if (type === 'category') createCategory({ name });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onFinish = (values: TBookChange) => {
    const payload = { ...values, image: files.image, book: files.pdf, workBook: files.workPdf };
    if (paramsForm) editBook({ ...values, _id: paramsForm._id, image: files.image });
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

  React.useEffect(() => {
    if (tagSuccess || categorySuccess) setName('');
  }, [tagSuccess, categorySuccess]);

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
            label="Название"
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item className="w-full" name="description" label="Описание">
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
        {/* Select Section */}
        <Form.Item name="videos" label="Видео" rules={[{ required: true, message: '' }]}>
          <Select mode="tags" placeholder="Добавьте несколько..." />
        </Form.Item>
        <Form.Item name="categoryId" label="Категория" rules={[{ required: true, message: '' }]}>
          <Select
            showSearch
            optionFilterProp="label"
            placeholder="Выберите Категорию"
            options={category?.data.map((el) => ({ value: el._id, label: el.name }))}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className="my-2" />
                <div className="flex gap-2 p-2">
                  <Input
                    placeholder="Пожалуйста, введите категорию"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    icon={<AiOutlinePlus />}
                    onClick={() => addItem('category')}
                    loading={categoryLoading}
                    disabled={!name}
                  >
                    Добавить категорию
                  </Button>
                </div>
              </>
            )}
          />
        </Form.Item>
        <Form.Item name="tagIds" label="Теги" rules={[{ required: true, message: '' }]}>
          <Select
            mode="multiple"
            placeholder="Выберите Теги"
            optionFilterProp="label"
            options={tags?.data.map((el) => ({ value: el._id, label: el.name }))}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className="my-2" />
                <div className="flex gap-2 p-2">
                  <Input
                    placeholder="Пожалуйста, введите тег"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    icon={<AiOutlinePlus />}
                    onClick={() => addItem('tag')}
                    loading={tagLoading}
                    disabled={!name}
                  >
                    Добавить тег
                  </Button>
                </div>
              </>
            )}
          />
        </Form.Item>
        {/* File Upload Section */}
        <FileInput
          label="Фото"
          name="image"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange('image')}
        />
        <FileInput
          label="Основная книга"
          name="book"
          accept=".pdf"
          hidden={!!paramsForm}
          onChange={handleFileChange('pdf')}
        />
        <FileInput
          label="Рабочая книга"
          name="workBook"
          accept=".pdf"
          hidden={!!paramsForm}
          onChange={handleFileChange('workPdf')}
        />
      </Form>
    </GlobalModal>
  );
};

export { BooksForm };
