import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchCreateUserBook, fetchDeleteUserBook, fetchGetUserBooks } from './user-tag.services';

const useGetUserBooksQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetUserBooks(params),
    queryKey: ['user-book', ...Object.values(params)],
    onError: (err: any) => message.error(err.response.data.meta.message),
  });

const useCreateUserBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateUserBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-book'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

const useDeleteUserBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteUserBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-book'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

export { useCreateUserBookMutation, useDeleteUserBookMutation, useGetUserBooksQuery };
