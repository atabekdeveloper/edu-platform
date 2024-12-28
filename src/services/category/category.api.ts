import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleError } from 'src/utils';
import {
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchGetCategories,
  fetchUpdateCategory,
} from './category.services';

const useGetCategoriesQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetCategories(params),
    queryKey: ['category', ...Object.values(params)],
    onError: handleError,
  });

const useCreateCategoryMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateCategory,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['category'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useUpdateCategoryMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdateCategory,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['category'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useDeleteCategoryMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteCategory,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['category'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

export {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
};
