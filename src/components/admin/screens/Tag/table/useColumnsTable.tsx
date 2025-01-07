import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { GlobalPopConfirm } from 'src/components/admin/shareds';
import { useDeleteTagMutation } from 'src/services/index.api';
import { TTagItem } from 'src/services/tag/tag.types';
import { useFormStorageStore } from 'src/store';

export const useColumnsTable = () => {
  const { t } = useTranslation();
  const { mutate: deleteTag, isLoading } = useDeleteTagMutation();
  const setParamsForm = useFormStorageStore((state) => state.setParamsForm);
  const columns: ColumnsType<TTagItem> = [
    {
      title: `${t('title')} (O'zbekcha)`,
      dataIndex: 'nameUz',
      key: 'nameUz',
      render: (value) => value || '-',
    },
    {
      title: `${t('title')} (Русский)`,
      dataIndex: 'nameRu',
      key: 'nameRu',
      render: (value) => value || '-',
    },
    {
      title: `${t('title')} (English)`,
      dataIndex: 'nameEng',
      key: 'nameEng',
      render: (value) => value || '-',
    },
    {
      title: t('bookCount'),
      dataIndex: 'bookCount',
      key: 'bookCount',
      render: (value) => value || '-',
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, r) => (
        <div className="flex gap-2">
          <Button icon={<MdOutlineEdit />} type="default" onClick={() => setParamsForm(r)} />
          <GlobalPopConfirm
            title={t('deleteTag')}
            description={t('deleteTagDesc')}
            onConfirm={() => deleteTag(r._id)}
            loading={isLoading}
          >
            <Button type="primary" danger icon={<MdDeleteOutline />} />
          </GlobalPopConfirm>
        </div>
      ),
    },
  ];
  return columns;
};
