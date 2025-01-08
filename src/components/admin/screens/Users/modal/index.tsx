import { Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalTable } from 'src/components/admin/shareds';
import { useGetUserBooksQuery } from 'src/services/index.api';
import { TUserBookItem } from 'src/services/user-book/user-book.types';
import { useFormStorageStore } from 'src/store';

const UserBookModal: React.FC = () => {
  const { t } = useTranslation();

  const { isModal, toggleModal, paramsForm } = useFormStorageStore();
  const { data: userBooks, isLoading } = useGetUserBooksQuery({ _id: paramsForm?._id });

  const columns: ColumnsType<TUserBookItem> = [
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (_, r) => r.bookId.title || '-',
    },
  ];
  return (
    <Modal open={isModal} title={paramsForm?.fullName} onCancel={toggleModal} footer={false}>
      <GlobalTable
        dataSource={userBooks?.data}
        columns={columns}
        loading={isLoading}
        pagination={false}
      />
    </Modal>
  );
};

export { UserBookModal };
