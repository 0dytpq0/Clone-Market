import Input from "@/components/atom/Input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isUserId, setIsUserId] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (isUserId && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isUserId]);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-[480px] min-h-[700px] mx-auto flex flex-col justify-center items-center gap-y-4">
      <h1 className="font-bold text-2xl">클론 마켓에 지금 로그인하세요!</h1>
      <Input
        inputValue={userId}
        setInputValue={setUserId}
        label="아이디"
        type="text"
        handleSubmit={() => {
          setIsUserId(true);
        }}
      />
      <Input
        inputValue={userPassword}
        setInputValue={setUserPassword}
        label="비밀번호"
        type="password"
        inputRef={passwordInputRef}
        innerClassName={`${isUserId ? "visible" : "invisible"} `}
        handleSubmit={() => {
          login.mutate(
            { userId, userPassword },
            {
              onSuccess: () => {
                router.push("/");
              },
              onError: (error) => {
                console.error("로그인 실패", error);
              },
            }
          );
        }}
      />
      {/* <button
      onClick={() => signup.mutate({ userId, userPassword })}
      className="w-full h-10 font-medium"
    >
      회원가입
    </button> */}
    </div>
  );
}

export default LoginForm;
