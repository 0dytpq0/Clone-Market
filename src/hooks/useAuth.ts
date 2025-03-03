// src/hooks/useAuthMutations.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authMutationOptions, authQueryOptions } from "../queries/queryOptions";
import { authKeys } from "@/queries/queryKeys";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/modal.context";
import MESSAGE from "@/constants/message";
import { User } from "@/types/User.types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const modal = useModal();

  const signup = useMutation(authMutationOptions.signup());
  const login = useMutation({
    ...authMutationOptions.login(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.userInfo });
      router.push("/");
    },
    onError: () => {
      modal.open({ title: MESSAGE.ERROR_MESSAGE.login });
    },
  });
  const logout = useMutation({
    ...authMutationOptions.logout(),
    onSuccess: () => {
      // logout시에 getUserInfo를 요청 시 error가 발생하여 리패칭되지 않기에 직접 수정
      queryClient.setQueryData(authKeys.userInfo, null);
      router.push("/");
    },
    onError: () => {
      modal.open({ title: MESSAGE.ERROR_MESSAGE.logout });
    },
  });
  const getUserInfo = useQuery<User>({
    ...authQueryOptions.getUserInfo(),
    retry: 0,
  });
  return { signup, login, logout, getUserInfo };
};
