import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 백엔드에서 전체 데이터 가져오기
    const response = await fetch("http://localhost:5000/newProduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const allData = await response.json();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const totalPages = Math.ceil(allData.length / limit);
    const paginatedData: Record<number, any[]> = {};

    for (let i = 0; i < totalPages; i++) {
      paginatedData[i + 1] = allData.slice(i * limit, (i + 1) * limit);
    }
    // 요청된 페이지 데이터 반환
    const pageData = paginatedData[page] || [];

    return NextResponse.json({
      data: pageData,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
    });
  } catch (error) {
    console.error("Main data fetching Error :", error);
    return NextResponse.json(
      { error: "Main data fetching Error" },
      { status: 500 }
    );
  }
}
