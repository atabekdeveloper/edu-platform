import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { TOrderChange, TOrderItem } from './order.types';

export const fetchGetOrders = async (params: TGetParamsChange): Promise<SR<TOrderItem>> => {
  const res = await api.get('/order', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateOrder = async (values: { bookId: string }): Promise<SRO<TOrderChange>> => {
  const res = await api.post('/order', values);
  return res.data;
};
export const fetchDeleteOrder = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/order/${id}`);
  return res.data;
};
