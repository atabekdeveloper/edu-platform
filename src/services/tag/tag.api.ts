import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleError } from 'src/utils';
import { fetchCreateTag, fetchDeleteTag, fetchGetTags, fetchUpdateTag } from './tag.services';

const useGetTagsQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetTags(params),
    queryKey: ['tag', ...Object.values(params)],
    onError: handleError,
  });

const useCreateTagMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateTag,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['tag'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useUpdateTagMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdateTag,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['tag'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useDeleteTagMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteTag,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['tag'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

export { useCreateTagMutation, useDeleteTagMutation, useGetTagsQuery, useUpdateTagMutation };
