import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { removeProperties } from 'src/utils';
import { TCategoryChange, TCategoryItem } from './category.types';

export const fetchGetCategories = async (params: TGetParamsChange): Promise<SR<TCategoryItem>> => {
  const res = await api.get('/category', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateCategory = async (
  values: TCategoryChange,
): Promise<SRO<TCategoryChange>> => {
  const res = await api.post('/category', values);
  return res.data;
};
export const fetchUpdateCategory = async (
  values: TCategoryChange,
): Promise<SRO<TCategoryChange>> => {
  const res = await api.put(`/category/${values._id}`, removeProperties(values, ['_id']));
  return res.data;
};
export const fetchDeleteCategory = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/category/${id}`);
  return res.data;
};
