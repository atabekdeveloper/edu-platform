import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchCreateBookTag, fetchDeleteBookTag, fetchGetBookTags } from './book-tag.services';

const useGetBookTagsQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetBookTags(params),
    queryKey: ['book-tag', ...Object.values(params)],
    onError: (err: any) => message.error(err.response.data.meta.message),
  });

const useCreateBookTagMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateBookTag,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['book-tag'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

const useDeleteBookTagMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteBookTag,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['book-tag'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

export { useCreateBookTagMutation, useDeleteBookTagMutation, useGetBookTagsQuery };
