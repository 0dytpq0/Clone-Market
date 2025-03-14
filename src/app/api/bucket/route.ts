import MESSAGE from "@/constants/message";
import { BucketContentType, DefaultContentType } from "@/types/Content.types";
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

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");
    const response = await fetch(
      `http://localhost:5000/bucket?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (response.length === 0) return new Error("장바구니 데이터가 없습니다.");

    const totalPrice = response.reduce(
      (sum: number, item: BucketContentType) => {
        const price =
          parseInt(item.spanTexts?.[6].replace(",", "") ?? "0", 10) *
          item.order;
        return sum + (isNaN(price) ? 0 : price);
      },
      0
    );
    return NextResponse.json({ bucket: response, totalPrice });
  } catch (e) {
    throw new Error("장바구니 데이터 페치 실패");
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: MESSAGE.ERROR_MESSAGE.noData },
        { status: 400 }
      );
    }

    for (const id of ids) {
      const getResponse = await fetch(`http://localhost:5000/bucket?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await getResponse.json();

      if (data.length === 0) {
        return NextResponse.json(
          { message: `${MESSAGE.ERROR_MESSAGE.noData}` },
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
    }

    return NextResponse.json({
      message: "선택한 모든 데이터를 성공적으로 삭제했습니다.",
    });
  } catch (e) {
    console.error(`${MESSAGE.ERROR_MESSAGE.delete}`, e);
    return NextResponse.json({ error: "장바구니 삭제 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();

    const response = await fetch(`http://localhost:5000/bucket/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data), // data를 중첩하지 않고 바로 전송
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return NextResponse.json(response);
  } catch (e) {
    console.error("장바구니 업데이트 실패:", e);
    return NextResponse.json(
      { error: "장바구니 업데이트 실패" },
      { status: 500 }
    );
  }
}
