import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY!);
const REFRESH_SECRET_KEY = new TextEncoder().encode(
  process.env.REFRESH_SECRET_KEY!
);

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    if (accessToken) {
      await jwtVerify(accessToken!.value, SECRET_KEY);
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
