import MESSAGE from "@/constants/message";
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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const getResponse = await fetch(`http://localhost:5000/bucket?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await getResponse.json();

    if (data.length === 0) {
      return NextResponse.json(
        { message: MESSAGE.ERROR_MESSAGE.noData },
        { status: 404 }
      );
    }

    for (const item of data) {
      await fetch(`http://localhost:5000/bucket/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.json({
      message: "모든 데이터를 성공적으로 삭제했습니다.",
    });
  } catch (e) {
    console.error(`${MESSAGE.ERROR_MESSAGE.delete} : `, e);
    return NextResponse.json({ error: "장바구니 삭제 실패" }, { status: 500 });
  }
}
