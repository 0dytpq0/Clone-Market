// services/authService.ts

import { apiFetch } from "@/utils/apiFetch";

export const signup = async (data: FormData) => {
  return await apiFetch("/api/auth/signup", {
    method: "POST",
    body: data,
  });
};

export const login = async ({
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

export const logout = async () => {
  try {
    const response = await apiFetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("로그아웃 실패");
    }

    return response.json();
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw new Error("Logout failed");
  }
};

export const getUserInfo = async () => {
  try {
    const response = await apiFetch("/api/auth/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    throw new Error("userInfo 호출 실패");
  }
};
