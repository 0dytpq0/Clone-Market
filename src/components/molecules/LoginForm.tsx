import Input from "@/components/atom/Input";
import MESSAGE from "@/constants/message";
import { useModal } from "@/contexts/modal.context";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isUserId, setIsUserId] = useState<boolean>(false);
  const modal = useModal();
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
        formType="login"
        inputValue={userId}
        setInputValue={setUserId}
        label="아이디"
        type="text"
        handleSubmit={() => {
          setIsUserId(true);
        }}
      />
      <Input
        formType="login"
        inputValue={userPassword}
        setInputValue={setUserPassword}
        label="비밀번호"
        type="password"
        ref={passwordInputRef}
        innerClassName={`${isUserId ? "visible" : "invisible"} `}
        handleSubmit={() => {
          login.mutate(
            { userId, userPassword },
            {
              onSuccess: () => {
                router.push("/");
              },
              onError: () => {
                modal.open({ title: MESSAGE.ERROR_MESSAGE.login });
              },
            }
          );
        }}
      />
    </div>
  );
}

export default LoginForm;
