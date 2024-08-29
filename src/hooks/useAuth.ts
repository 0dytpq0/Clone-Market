// src/hooks/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
import { authMutationOptions } from "../queries/queryOptions";

export const useAuth = () => {
  const signup = useMutation(authMutationOptions.signup());
  const login = useMutation(authMutationOptions.login());

  return { signup, login };
};
