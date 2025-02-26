export const authKeys = {
  signup: ["auth", "signup"] as const,
  login: ["auth", "login"] as const,
  me : ['auth','me'] as const
};

export const dataKeys = {
  home: ["data", "home"] as const,
  newProduct: ["data", "newProduct"] as const,
  bucket: ["data", "bucket"] as const,
};
