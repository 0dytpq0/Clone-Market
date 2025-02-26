import MESSAGE from "@/constants/message";
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
    if (userId === "" || userPassword === "") {
      return NextResponse.json(
        {
          error: MESSAGE.ERROR_MESSAGE.invalidData,
        },
        { status: 500 }
      );
    }
    if (!response.ok) {
      return NextResponse.json(
        { error: MESSAGE.ERROR_MESSAGE.invalidData },
        { status: 500 }
      );
    }

    const users = await response.json();
    if (users.length === 0) {
      return NextResponse.json(
        { error: MESSAGE.ERROR_MESSAGE.noData },
        { status: 401 }
      );
    }

    const accessToken = await new SignJWT({ user: users[0] })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(SECRET_KEY);

    const refreshToken = await new SignJWT({ user: users[0] })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(REFRESH_SECRET_KEY);

    const responseWithCookies = NextResponse.json({
      message: "login Success",
    });

    responseWithCookies.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
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
    return NextResponse.json(
      { error: MESSAGE.ERROR_MESSAGE.unexpected },
      { status: 500 }
    );
  }
}
