import { apiFetch } from "@/utils/apiFetch";
import { authKeys } from "./queryKeys";

// TODO 폼데이터 맞춰서 서버에 회원가입만 시켜주면 됨
// 회원 가입 후 가입 완료 알려준 후 로그인 바로 로그인 시키고 홈페이지로
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
