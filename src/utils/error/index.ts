import { message } from 'antd';

export const handleError = (err: any) => {
  message.error(err.response?.data?.meta.message);
};
