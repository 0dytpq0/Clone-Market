const ERROR_MESSAGE = Object.freeze({
  login: "아이디와 비밀번호를 다시 확인해주세요.",
  noData: "No Data",
  invalidData: "Invalid Data",
  unexpected: "Unexpected error occurred",
  userName: "2글자 이상 적어주세요",
  userId: "영문 + 숫자 형식으로 적어주세요.",
  password: "영문, 숫자를 포함하여 8자 이상 적어주세요.",
  email: "이메일 형식에 맞게 적어주세요",
  birthDate: "YYYYMMDD 형식에 맞게 적어주세요",
  phoneNumber: "11자리 ~ 15자리 숫자만 적어주세요",
  verifyPassword: "비밀번호가 정확한지 확인해주세요.",
  address: "한글 + 숫자 + -로 이뤄진 주소를 적어주세요",
});

const MESSAGE = Object.freeze({ ERROR_MESSAGE });

export default MESSAGE;
