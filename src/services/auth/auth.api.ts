import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAuthPersistStore } from 'src/store';
import { handleError } from 'src/utils';
import { fetchAuthLogin, fetchAuthLogout, fetchGetAuth } from './auth.services';

const useGetAuthUserQuery = () => {
  const { signOut } = useAuthPersistStore();
  return useQuery({
    queryFn: fetchGetAuth,
    queryKey: ['auth'],
    onError: (err) => {
      handleError(err as never);
      signOut();
    },
  });
};

const useAuthLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchAuthLogin,
    onSuccess: (res) => {
      message.success(res.meta.message);
      queryClient.invalidateQueries(['auth']);
    },
    onError: handleError,
  });
};

const useAuthLogoutMutation = () =>
  useMutation({
    mutationFn: fetchAuthLogout,
    onSuccess: (res) => message.success(res.meta.message),
    onError: handleError,
  });

export { useAuthLoginMutation, useAuthLogoutMutation, useGetAuthUserQuery };
