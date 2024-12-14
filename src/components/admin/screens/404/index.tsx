import { Result } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TbArrowBackUp } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { UiButton } from 'src/components/admin/ui';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      className="my-auto"
      subTitle={t('notFound')}
      extra={
        <UiButton onClick={() => navigate(-1)} icon={<TbArrowBackUp />}>
          {t('back')}
        </UiButton>
      }
    />
  );
};

export { NotFound };
