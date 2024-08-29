import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY!);
const REFRESH_SECRET_KEY = new TextEncoder().encode(
  process.env.REFRESH_SECRET_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, userPassword } = await req.json();
    const response = await fetch(
      `http://localhost:5000/user?userId=${userId}&userPassword=${userPassword}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "유저 DB에 접근을 실패했습니다." },
        { status: 500 }
      );
    }

    const users = await response.json();

    if (users.length === 0) {
      return NextResponse.json(
        { error: "유저 정보가 없습니다." },
        { status: 401 }
      );
    }

    const accessToken = await new SignJWT({ user: users[0] })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(SECRET_KEY);

    const refreshToken = await new SignJWT({ user: users[0] })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(REFRESH_SECRET_KEY);

    const responseWithCookies = NextResponse.json({
      message: "로그인 성공",
    });

    responseWithCookies.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
    });

    responseWithCookies.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return responseWithCookies;
  } catch (error) {
    console.error("에러 :", error);
    return NextResponse.json(
      { error: "예기치 못한 에러 발생" },
      { status: 500 }
    );
  }
}
