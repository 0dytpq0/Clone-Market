"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

function LoginPage() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const { login, signup } = useAuth();

  return (
    <div className="w-[340px] mx-auto flex flex-col ">
      <input
        onChange={(e) => setUserId(e.target.value)}
        className="w-full h-10"
        placeholder="아이디를 입력해주세요."
      />
      <input
        onChange={(e) => setUserPassword(e.target.value)}
        type="password"
        className="w-full h-10"
        placeholder="비밀번호를 입력해주세요."
      />
      <button
        onClick={() => login.mutate({ userId, userPassword })}
        className="w-full h-10 font-medium"
      >
        로그인
      </button>
      <button
        onClick={() => signup.mutate({ userId, userPassword })}
        className="w-full h-10 font-medium"
      >
        회원가입
      </button>
    </div>
  );
}

export default LoginPage;
