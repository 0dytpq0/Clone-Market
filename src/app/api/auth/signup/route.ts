import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, userPassword } = await req.json();

  const response = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, userPassword }),
  });
  return NextResponse.json(response);
}
