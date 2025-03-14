import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();
    console.log("data", data);
    const response = await fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return NextResponse.json(response);
  } catch (e) {
    throw new Error("결제 데이터 추가 실패");
  }
}
