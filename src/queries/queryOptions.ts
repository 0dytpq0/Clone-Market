import { apiFetch } from "@/utils/apiFetch";
import { authKeys } from "./queryKeys";

export const authMutationOptions = {
  signup: () => ({
    mutationKey: authKeys.signup,
    mutationFn: async (data: FormData) =>
      await apiFetch("/api/auth/signup", {
        method: "POST",
        body: data,
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
    }) => {
      try {
        await apiFetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            userPassword,
          }),
        });
      } catch (e) {
        throw new Error("로그인 실패");
      }
    },
  }),
};
