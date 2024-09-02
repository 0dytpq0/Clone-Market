"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import Input from "../atom/Input";

function SignupForm() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    userId: "",
    userPassword: "",
    verifyPassword: "",
    phoneNumber: "",
    birthDate: "",
    email: "",
    address: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("userPassword", formData.userPassword);
    data.append("verifyPassword", formData.verifyPassword);
    data.append("userName", formData.userName);
    data.append("birthDate", formData.birthDate);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("phoneNumber", formData.phoneNumber);
    signup.mutate(data);
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
          required
        />

        <Input
          label="비밀번호"
          name="password"
          type="password"
          inputValue={formData.userPassword}
          setInputValue={(value) => handleChange("userPassword", value)}
          formType="signup"
          required
        />
        <Input
          label="비밀번호 확인"
          name="verifyPassword"
          type="password"
          inputValue={formData.verifyPassword}
          setInputValue={(value) => handleChange("verifyPassword", value)}
          formType="signup"
          required
        />
        <Input
          label="성명"
          name="username"
          type="text"
          inputValue={formData.userName}
          setInputValue={(value) => handleChange("userName", value)}
          formType="signup"
          required
        />
        <Input
          label="생년월일"
          name="birthDate"
          type="text"
          inputValue={formData.birthDate}
          setInputValue={(value) => handleChange("birthDate", value)}
          formType="signup"
          required
        />
        <Input
          label="이메일"
          name="email"
          type="email"
          inputValue={formData.email}
          setInputValue={(value) => handleChange("email", value)}
          formType="signup"
          required
        />
        <Input
          label="주소"
          name="address"
          type="text"
          inputValue={formData.address}
          setInputValue={(value) => handleChange("address", value)}
          formType="signup"
          required
        />
        <Input
          label="휴대전화"
          name="phoneNumber"
          type="text"
          inputValue={formData.phoneNumber}
          setInputValue={(value) => handleChange("phoneNumber", value)}
          formType="signup"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
