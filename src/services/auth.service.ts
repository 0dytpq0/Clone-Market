// services/authService.ts

import { apiFetch } from "@/utils/apiFetch";

export const signupService = async (data: FormData) => {
  return await apiFetch("/api/auth/signup", {
    method: "POST",
    body: data,
  });
};

export const loginService = async ({
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
};
