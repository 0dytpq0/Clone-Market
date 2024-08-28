import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const scriptPath = path.resolve("./src/app/api/crawler/crawler.js");
  console.log("123", 123);
  return new Promise((resolve) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      } else {
        try {
          const data = JSON.parse(stdout); // stdout에서 JSON 파싱
          console.log("data", data);
          resolve(NextResponse.json(data)); // 데이터를 그대로 반환
        } catch (parseError) {
          console.error(`JSON parse error: ${parseError}`);
          resolve(
            NextResponse.json(
              { error: "Failed to parse JSON" },
              { status: 500 }
            )
          );
        }
      }
    });
  });
}
