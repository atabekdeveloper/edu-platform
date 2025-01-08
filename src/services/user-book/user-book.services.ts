import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { TUserBookChange, TUserBookItem } from './user-book.types';

export const fetchGetUserBooks = async (params: TGetParamsChange): Promise<SR<TUserBookItem>> => {
  const res = await api.get('/user-book', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateUserBook = async (values: {
  bookId: string;
}): Promise<SRO<TUserBookChange>> => {
  const res = await api.post('/user-book', values);
  return res.data;
};
export const fetchDeleteUserBook = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/user-book/${id}`);
  return res.data;
};
