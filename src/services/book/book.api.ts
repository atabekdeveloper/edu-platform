import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchCreateBook,
  fetchDeleteBook,
  fetchGetBookItem,
  fetchGetBooks,
  fetchUpdateBook,
} from './book.services';
import { TBookItemParams } from './book.types';

const useGetBooksQuery = (params: TGetParamsChange & TBookItemParams) =>
  useQuery({
    queryFn: () => fetchGetBooks(params),
    queryKey: ['book', ...Object.values(params)],
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
const useGetBookItemQuery = (params: { id: string }) =>
  useQuery({
    queryFn: () => fetchGetBookItem(params),
    queryKey: ['book', ...Object.values(params)],
    onError: (err: any) => message.error(err.response.data.meta.message),
  });

const useCreateBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['book'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

const useUpdateBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdateBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['book'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

const useDeleteBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['book'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

export {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBookItemQuery,
  useGetBooksQuery,
  useUpdateBookMutation,
};
