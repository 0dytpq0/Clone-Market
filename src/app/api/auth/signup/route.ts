import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userInfo = {
    userId: formData.get("userId"),
    userPassword: formData.get("userPassword"),
    verifyPassword: formData.get("verifyPassword"),
    userName: formData.get("userName"),
    birthDate: formData.get("birthDate"),
    email: formData.get("email"),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
  };
  const response = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return NextResponse.json(response);
}
