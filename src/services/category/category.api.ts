import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    onError: (err: any) => message.error(err.response.data.meta.message),
  });

const useCreateCategoryMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateCategory,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['category'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
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
    onError: (err: any) => message.error(err.response.data.meta.message),
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
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

export {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
};
