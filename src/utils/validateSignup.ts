import MESSAGE from "@/constants/message";
import { debounce } from "lodash";

type SignupProps = {
  email: string;
  birthDate: string;
  phoneNumber: string;
  userId: string;
  userName: string;
  userPassword: string;
  verifyPassword: string;
  address: string;
};

function email(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : MESSAGE.ERROR_MESSAGE.email;
}

function birthDate(birthDate: string): string | null {
  const birthDateRegex = /^\d{4}\d{2}\d{2}$/; // YYYY-MM-DD 형식
  return birthDateRegex.test(birthDate)
    ? null
    : MESSAGE.ERROR_MESSAGE.birthDate;
}

function phoneNumber(phoneNumber: string): string | null {
  const phoneNumberRegex = /^\d{11,15}$/; // 10-15 자리의 숫자
  return phoneNumberRegex.test(phoneNumber)
    ? null
    : MESSAGE.ERROR_MESSAGE.phoneNumber;
}

function userId(userId: string): string | null {
  const pattern = /^[a-zA-Z0-9]*$/;
  return pattern.test(userId) ? null : MESSAGE.ERROR_MESSAGE.userId;
}

function userName(userName: string): string | null {
  const pattern = /^[가-힣]{2,}$/;

  return pattern.test(userName) ? null : MESSAGE.ERROR_MESSAGE.userName;
}

function userPassword(userPassword: string): string | null {
  const lengthValid = userPassword.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(userPassword);
  const hasNumbers = /\d/.test(userPassword);

  if (!hasLetters || !hasNumbers || !lengthValid) {
    return MESSAGE.ERROR_MESSAGE.password;
  }

  return null;
}

function verifyPassword(
  userPassword: string,
  verifyPassword: string | undefined
): string | null {
  return userPassword === verifyPassword
    ? null
    : MESSAGE.ERROR_MESSAGE.verifyPassword;
}

const address = debounce((address: string): string | null => {
  const pattern = /^[가-힣0-9\- ]*$/;
  return pattern.test(address) ? null : MESSAGE.ERROR_MESSAGE.address;
}, 300);

function form(data: SignupProps): void {
  const errors: { [key in keyof SignupProps]?: string | null } = {
    email: Validator.signup.email(data.email),
    birthDate: Validator.signup.birthDate(data.birthDate),
    phoneNumber: Validator.signup.phoneNumber(data.phoneNumber),
    userId: Validator.signup.userId(data.userId),
    userName: Validator.signup.userName(data.userName),
    userPassword: Validator.signup.userPassword(data.userPassword),
    verifyPassword: Validator.signup.verifyPassword(
      data.userPassword,
      data.verifyPassword
    ),
    address: Validator.signup.address(data.address),
  };

  (Object.keys(errors) as (keyof SignupProps)[]).forEach((key) => {
    const errorMessage = errors[key];
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  });
}
export const Validator = {
  signup: {
    form,
    email,
    birthDate,
    phoneNumber,
    userId,
    userName,
    userPassword,
    verifyPassword,
    address,
  },
};
