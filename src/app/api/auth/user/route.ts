import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY!);


export default async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  if (!accessToken) {
    throw new Error("로그인 상태가 아닙니다.");
  }
  const userInfo = jwtVerify(accessToken.value, SECRET_KEY);
  return NextResponse.json(userInfo);
}
