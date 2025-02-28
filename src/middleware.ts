import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);
const REFRESH_SECRET_KEY = new TextEncoder().encode(
  process.env.REFRESH_SECRET_KEY
);
export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");
  console.log("accessToken, refreshToken", accessToken, refreshToken);
  if (!accessToken && !refreshToken) {
    if (req.nextUrl.pathname !== "/user/login") {
      return NextResponse.redirect(new URL("/user/login", req.url), {
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    }
  }

  let decodedUser = null;

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken.value, SECRET_KEY);
      decodedUser = payload.user;
      return NextResponse.next({
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    } catch (error) {
      console.log("Access token expired, trying refresh token...");
    }
  }

  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(
        refreshToken.value,
        REFRESH_SECRET_KEY
      );
      decodedUser = payload.user;

      const newAccessToken = await new SignJWT({ user: decodedUser })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(SECRET_KEY);

      const response = NextResponse.next({
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      });
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60,
        path: "/",
      });

      return response;
    } catch (error) {
      console.error("Refresh token expired or invalid");
      return NextResponse.redirect(new URL("/user/login", req.url), {
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    }
  }
}
export const config = {
  matcher: ["/bucket"],
};
