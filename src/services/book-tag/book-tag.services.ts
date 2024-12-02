import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { TBookTagChange, TBookTagItem } from './book-tag.types';

export const fetchGetBookTags = async (params: TGetParamsChange): Promise<SR<TBookTagItem>> => {
  const res = await api.get('/book-tag', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateBookTag = async (values: TBookTagItem): Promise<SRO<TBookTagChange>> => {
  const res = await api.post('/book-tag', values);
  return res.data;
};
export const fetchDeleteBookTag = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/book-tag/${id}`);
  return res.data;
};
