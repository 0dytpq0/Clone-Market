import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch("http://localhost:5000/main", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Main data fetching Error :", error);
    return NextResponse.json(
      { error: "Main data fetching Error" },
      { status: 500 }
    );
  }
}
