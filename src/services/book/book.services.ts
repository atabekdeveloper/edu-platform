import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { removeProperties } from 'src/utils';
import { TBookChange, TBookItem } from './book.types';

export const fetchGetBooks = async (params: TGetParamsChange): Promise<SR<TBookItem>> => {
  const res = await api.get('/book', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateBook = async (values: TBookChange): Promise<SRO<TBookChange>> => {
  const res = await api.post('/book', values, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
export const fetchUpdateBook = async (values: TBookChange): Promise<SRO<TBookChange>> => {
  const res = await api.patch(
    `/book/${values._id}`,
    removeProperties(values, ['_id', values.image ? '' : 'image']),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
export const fetchDeleteBook = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/book/${id}`);
  return res.data;
};
