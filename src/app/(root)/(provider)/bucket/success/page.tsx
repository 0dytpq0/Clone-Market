"use client";
import Loading from "@/components/atom/Loading";
import { useBucketContext } from "@/contexts/bucket.context";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
const encryptedSecretKey =
  "Basic " +
  Buffer.from("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm:").toString("base64");
// ------ Payment 객체 ------
// @docs https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: "카드" | "가상계좌" | "계좌이체";
  paymentKey: string;
  orderId: string;
}

async function getPaymentData(searchParams: Payment) {
  if (
    !searchParams.paymentKey ||
    !searchParams.orderId ||
    !searchParams.totalAmount
  ) {
    return null;
  }

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${encryptedSecretKey}:`).toString(
          "base64"
        )}`,
      },
      body: JSON.stringify({
        paymentKey: searchParams.paymentKey,
        orderId: searchParams.orderId,
        totalAmount: Number(searchParams.totalAmount),
      }),
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<Payment>;
}

export default function SuccessPage(searchParams: Payment) {
  const { checkoutData } = useBucketContext();
  const {
    data: payment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentData", checkoutData?.orderId],
    queryFn: () => getPaymentData(checkoutData!),
    enabled: !!checkoutData, // checkoutData가 존재할 때만 실행
    retry: 3, // 실패 시 한 번 재시도
  });

  useEffect(() => {
    console.log("결제 정보:", payment);
  }, [payment]);
  return (
    <main>
      <div
        className="box_section"
        style={{ width: "600px", minHeight: "400px" }}
      >
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 완료"
        />
        <h2>결제를 완료했어요</h2>

        {/* ✅ Skeleton UI 적용 */}
        {isLoading ? (
          <div
            style={{
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        ) : isError || !payment ? (
          <p>결제 정보를 불러오는 데 실패했습니다.</p>
        ) : (
          <>
            <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
              <div className="p-grid-col text--left">
                <b>결제금액</b>
              </div>
              <div className="p-grid-col text--right" id="amount">
                {payment.totalAmount.toLocaleString()}원
              </div>
            </div>

            <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
              <div className="p-grid-col text--left">
                <b>주문번호</b>
              </div>
              <div className="p-grid-col text--right" id="orderId">
                {payment.orderId}
              </div>
            </div>

            <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
              <div className="p-grid-col text--left">
                <b>paymentKey</b>
              </div>
              <div
                className="p-grid-col text--right"
                id="paymentKey"
                style={{ whiteSpace: "initial", width: "250px" }}
              >
                {payment.paymentKey}
              </div>
            </div>

            <div className="p-grid-col">
              <Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
                <button className="button p-grid-col5">연동 문서</button>
              </Link>
              <Link href="https://discord.gg/A4fRFXQhRu">
                <button
                  className="button p-grid-col5"
                  style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
                >
                  실시간 문의
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <div
        className="box_section"
        style={{ width: "600px", textAlign: "left" }}
      >
        <b>Response Data :</b>
        <div
          id="response"
          style={{ whiteSpace: "initial", minHeight: "150px" }}
        >
          {payment && <pre>{JSON.stringify(payment, null, 4)}</pre>}
        </div>
      </div>
    </main>
  );
}
