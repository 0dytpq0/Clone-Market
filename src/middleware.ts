import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY!);
const REFRESH_SECRET_KEY = new TextEncoder().encode(
  process.env.REFRESH_SECRET_KEY!
);

// 작동을 안함 root에 위치하라해놓고 src 파일 아래였음
export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");
  // Error: The edge runtime does not support Node.js 'crypto' module.
  console.log("req.url", req.url);
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    if (accessToken) {
      await jwtVerify(accessToken!.value, SECRET_KEY);
      // 미들웨어에서 사용되는 메서드로 요청을 정상적으로 계속 처리하라는 지시를 서버에 전달
      // -> 다음 단계 진행시켜!
      return NextResponse.next();
    }
  } catch (error) {
    console.log("Access token expired");
  }

  try {
    if (refreshToken) {
      const { payload } = await jwtVerify(
        refreshToken!.value,
        REFRESH_SECRET_KEY
      );
      const newAccessToken = await new SignJWT({ user: payload.user })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(SECRET_KEY);

      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60,
      });

      return response;
    }
  } catch (error) {
    console.error("Refresh token expired or invalid");
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/"],
};
