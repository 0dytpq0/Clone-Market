import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();
    const existingItemResponse = await fetch(
      `http://localhost:5000/bucket?id=${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const existingItems = await existingItemResponse.json();
    let response;

    if (existingItems.length > 0) {
      const updatedItem = {
        ...existingItems[0],
        order: existingItems[0].order + 1,
      };

      response = await fetch(
        `http://localhost:5000/bucket/${existingItems[0].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      ).then((res) => res.json());
    } else {
      const newItem = { ...data, order: 1 };

      response = await fetch("http://localhost:5000/bucket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }).then((res) => res.json());
    }
    return NextResponse.json(response);
  } catch (e) {
    throw new Error("장바구니 추가 실패");
  }
}