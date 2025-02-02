import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleError } from 'src/utils';
import { fetchCreateUserBook, fetchDeleteUserBook, fetchGetUserBooks } from './user-book.services';

const useGetUserBooksQuery = (params: TGetParamsChange & { _id: string }) =>
  useQuery({
    queryFn: () => fetchGetUserBooks(params),
    queryKey: ['user-book', ...Object.values(params)],
    onError: handleError,
    enabled: !!params._id,
  });

const useCreateUserBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateUserBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-book'] });
      client.invalidateQueries({ queryKey: ['book'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useDeleteUserBookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteUserBook,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-book'] });
      client.invalidateQueries({ queryKey: ['book'] });
      message.success(res.meta.message);
    },
    // onError: handleError,
  });
};

export { useCreateUserBookMutation, useDeleteUserBookMutation, useGetUserBooksQuery };
