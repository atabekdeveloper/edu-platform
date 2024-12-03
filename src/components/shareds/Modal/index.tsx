import { Button, Modal, ModalProps } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import React, { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useFormStorageStore } from 'src/store';
import { useShallow } from 'zustand/react/shallow';

interface IGlobalModalState {
  form: FormInstance<any>;
  width?: number;
  isLoading: boolean;
  isError: boolean;
}

const GlobalModal: React.FC<IGlobalModalState & ModalProps> = ({
  form,
  width = 360,
  isLoading,
  isError,
  ...modalProps
}) => {
  const { paramsForm, isModal, toggleModal, setParamsItem } = useFormStorageStore(
    useShallow((state) => state),
  );

  const onCloseModal = () => {
    if (isModal) toggleModal();
    form.resetFields();
    setParamsItem(null);
  };

  useEffect(() => {
    if (!isError && !isLoading) onCloseModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return (
    <Modal
      open={isModal}
      width={width}
      centered
      closeIcon={<IoCloseOutline />}
      title={paramsForm ? 'Изменить' : 'Добавить'}
      className="my-4"
      footer={
        <div className="flex flex-col gap-3 pt-3 border-t border-[#D9D9D9]">
          <Button type="primary" onClick={form.submit} loading={isLoading}>
            Сохранить
          </Button>
        </div>
      }
      onCancel={onCloseModal}
      {...modalProps}
    />
  );
};

export { GlobalModal };
