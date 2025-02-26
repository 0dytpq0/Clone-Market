export const apiFetch = async (endpoint: string, options = {}) => {
  const isServer = typeof window === "undefined";

  const url = isServer ? endpoint : `http://localhost:3000${endpoint}`;

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("네트워크 요청 실패");
  }

  return response.json();
};
