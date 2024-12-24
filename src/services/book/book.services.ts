import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { removeProperties } from 'src/utils';
import { TBookChange, TBookItem, TBookItemParams } from './book.types';

export const fetchGetBooks = async (
  params: TGetParamsChange & TBookItemParams,
): Promise<SR<TBookItem>> => {
  const res = await api.get('/book', { params: removeProperties(params, ['title', 'categoryId']) });
  return res.data;
};
export const fetchGetBookItem = async (params: { id: string }): Promise<SRO<TBookItem>> => {
  const res = await api.get(`/book/${params.id}`);
  return res.data;
};
export const fetchCreateBook = async (values: TBookChange): Promise<SRO<TBookChange>> => {
  const res = await api.post('/book', removeProperties(values, ['_id']), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
export const fetchUpdateBook = async (values: TBookChange): Promise<SRO<TBookChange>> => {
  const res = await api.put(`/book/${values._id}`, removeProperties(values, [], ['_id']), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
export const fetchDeleteBook = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/book/${id}`);
  return res.data;
};
