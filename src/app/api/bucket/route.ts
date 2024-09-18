import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();
    const response = await fetch("http://localhost:5000/bucket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    return NextResponse.json(response);
  } catch (e) {
    throw new Error("장바구니 추가 실패");
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch("http://localhost:5000/bucket", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return NextResponse.json(response);
  } catch (e) {
    throw new Error("장바구니 데이터 페치 실패");
  }
}
