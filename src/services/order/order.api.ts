import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleError } from 'src/utils';
import { fetchCreateOrder, fetchDeleteOrder, fetchGetOrders } from './order.services';

const useGetOrdersQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetOrders(params),
    queryKey: ['order', ...Object.values(params)],
    onError: handleError,
  });

const useCreateOrderMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateOrder,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['order'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useDeleteOrderMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteOrder,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['order'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

export { useCreateOrderMutation, useDeleteOrderMutation, useGetOrdersQuery };
