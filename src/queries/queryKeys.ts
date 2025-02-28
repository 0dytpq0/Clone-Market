export const authKeys = {
  signup: ["auth", "signup"] as const,
  login: ["auth", "login"] as const,
  logout: ["auth", "logout"] as const,
  userInfo: ["auth", "userInfo"] as const,
};

export const dataKeys = {
  home: ["data", "home"] as const,
  newProduct: ["data", "newProduct"] as const,
  bucket: ["data", "bucket"] as const,
};
