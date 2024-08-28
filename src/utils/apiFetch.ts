const BASE_URL = "http://localhost:3000";

const apiFetch = async (endpoint: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error("네트워크 요청 실패");
  }
  return response.json();
};
