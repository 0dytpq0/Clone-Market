"use client";

import { useModal } from "@/contexts/modal.context";
import { useAuth } from "@/hooks/useAuth";
import { Validator } from "@/utils/validateSignup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import Button from "../atom/Button";
import Input from "../atom/Input";

type formDataType = {
  userName: string;
  userId: string;
  userPassword: string;
  verifyPassword: string;
  phoneNumber: string;
  birthDate: string;
  email: string;
  address: string;
};

function SignupForm() {
  const { signup, login } = useAuth();
  const router = useRouter();
  const modal = useModal();
  const [formData, setFormData] = useState<formDataType>({
    userName: "",
    userId: "",
    userPassword: "",
    verifyPassword: "",
    phoneNumber: "",
    birthDate: "",
    email: "",
    address: "",
  });

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    handleChange("address", fullAddress);
  };

  const handleChange = (name: keyof formDataType, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof formDataType;
      data.append(key, typedKey);
    });

    Validator.signup.form(formData);
    signup.mutate(data, {
      onSuccess: () => {
        login.mutate({
          userId: formData.userId,
          userPassword: formData.userPassword,
        });
        router.push("/");
      },
      onError: () => {
        modal.open({ title: "회원가입 실패" });
      },
    });
  };

  const openAddressPopup = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="max-w-[460px] mx-auto flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-bold pt-8 w-full text-center">
        Clone Market ID 생성
      </h2>
      <form
        className="w-full flex flex-col gap-y-4 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          label="아이디"
          name="userId"
          type="text"
          inputValue={formData.userId}
          setInputValue={(value) => handleChange("userId", value)}
          formType="signup"
          validator={Validator.signup.userId}
          required
        />

        <Input
          label="비밀번호"
          name="password"
          type="password"
          inputValue={formData.userPassword}
          setInputValue={(value) => handleChange("userPassword", value)}
          validator={Validator.signup.userPassword}
          formType="signup"
          required
        />
        <Input
          label="비밀번호 확인"
          name="verifyPassword"
          type="password"
          inputValue={formData.verifyPassword}
          setInputValue={(value) => handleChange("verifyPassword", value)}
          validator={() =>
            Validator.signup.verifyPassword(
              formData.userPassword,
              formData.verifyPassword
            )
          }
          formType="signup"
          required
        />
        <Input
          label="성명"
          name="username"
          type="text"
          inputValue={formData.userName}
          setInputValue={(value) => handleChange("userName", value)}
          validator={Validator.signup.userName}
          formType="signup"
          required
        />
        <Input
          label="생년월일"
          name="birthDate"
          type="text"
          inputValue={formData.birthDate}
          setInputValue={(value) => handleChange("birthDate", value)}
          validator={Validator.signup.birthDate}
          formType="signup"
          required
        />
        <Input
          label="이메일"
          name="email"
          type="email"
          inputValue={formData.email}
          setInputValue={(value) => handleChange("email", value)}
          validator={Validator.signup.email}
          formType="signup"
          required
        />
        <Input
          label="주소 (클릭시 팝업이 노출됩니다.)"
          name="address"
          type="text"
          inputValue={formData.address}
          setInputValue={(value) => handleChange("address", value)}
          validator={Validator.signup.address}
          formType="signup"
          onClick={() => {
            formData.address ? null : openAddressPopup();
          }}
          required
        />
        <Input
          label="휴대전화"
          name="phoneNumber"
          type="text"
          inputValue={formData.phoneNumber}
          setInputValue={(value) => handleChange("phoneNumber", value)}
          validator={Validator.signup.phoneNumber}
          formType="signup"
          required
        />
        <Button type="submit" size={"lg"}>
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default SignupForm;
