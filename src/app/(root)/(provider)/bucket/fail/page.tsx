"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

function FailPage() {
  const searchParams = useSearchParams();
  const errCode = searchParams.get("code");
  const failMsg = searchParams.get("message");

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${errCode}`}</p>
        <p>{`실패 사유: ${failMsg}`}</p>
      </div>
    </div>
  );
}

export default FailPage;
