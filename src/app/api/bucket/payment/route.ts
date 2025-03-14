import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();
    console.log("받은 데이터:", data);

    if (!data || !data.customerEmail) {
      throw new Error("유효하지 않은 데이터입니다.");
    }

    const email = data.customerEmail;

    const getResponse = await fetch(
      `http://localhost:5000/payment?customerEmail=${email}`
    );
    const payments = await getResponse.json();

    if (Array.isArray(payments) && payments.length > 0) {
      for (const payment of payments) {
        console.log("삭제할 결제 ID:", payment.id);
        await fetch(`http://localhost:5000/payment/${payment.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      console.log("삭제할 결제 데이터가 없습니다.");
    }
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
