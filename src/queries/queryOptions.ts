// src/queries/queryOptions.ts
import { apiFetch } from "@/utils/apiFetch";
import { authKeys } from "./queryKeys";

export const authMutationOptions = {
  signup: () => ({
    mutationKey: authKeys.signup,
    mutationFn: async ({
      userId,
      userPassword,
    }: {
      userId: string;
      userPassword: string;
    }) =>
      await apiFetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userPassword,
        }),
      }),
  }),

  login: () => ({
    mutationKey: authKeys.login,
    mutationFn: async ({
      userId,
      userPassword,
    }: {
      userId: string;
      userPassword: string;
    }) =>
      await apiFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userPassword,
        }),
      }),
  }),
};
