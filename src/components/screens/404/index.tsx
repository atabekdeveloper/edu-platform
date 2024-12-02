import { Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UiButton } from 'src/components/ui';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      className="my-auto"
      subTitle="К сожалению, страница, которую вы посетили, не существует."
      extra={<UiButton onClick={() => navigate('/')}>Вернуться домой</UiButton>}
    />
  );
};

export { NotFound };
