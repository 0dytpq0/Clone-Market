import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const REFRESH_SECRET_KEY = new TextEncoder().encode(
  process.env.REFRESH_SECRET_KEY
);

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    // 1. refreshToken 검증
    const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET_KEY);

    console.log("로그아웃 처리된 사용자:", payload.user);

    const response = NextResponse.json({ message: "Logout successful" });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
