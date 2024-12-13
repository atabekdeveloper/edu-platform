import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { removeProperties } from 'src/utils';
import { TTagChange, TTagItem } from './tag.types';

export const fetchGetTags = async (params: TGetParamsChange): Promise<SR<TTagItem>> => {
  const res = await api.get('/tag', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateTag = async (values: TTagChange): Promise<SRO<TTagChange>> => {
  const res = await api.post('/tag', values);
  return res.data;
};
export const fetchUpdateTag = async (values: TTagChange): Promise<SRO<TTagChange>> => {
  const res = await api.put(`/tag/${values._id}`, removeProperties(values, ['_id']));
  return res.data;
};
export const fetchDeleteTag = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/tag/${id}`);
  return res.data;
};
