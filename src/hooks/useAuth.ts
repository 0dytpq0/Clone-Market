// src/hooks/useAuthMutations.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authMutationOptions, authQueryOptions } from "../queries/queryOptions";
import { authKeys } from "@/queries/queryKeys";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const signup = useMutation(authMutationOptions.signup());
  const login = useMutation({
    mutationKey: authMutationOptions.login().mutationKey,
    mutationFn: authMutationOptions.login().mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.userInfo });
    },
  });
  const logout = useMutation({
    mutationKey: authMutationOptions.logout().mutationKey,
    mutationFn: authMutationOptions.logout().mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.userInfo });
    },
  });
  const getUserInfo = useQuery(authQueryOptions.getUserInfo());
  return { signup, login, logout, getUserInfo };
};
