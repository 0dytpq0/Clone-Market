"use client";
import Button from "@/components/atom/Button";
import Loading from "@/components/atom/Loading";
import BucketContentCard from "@/components/molecules/BucketContentCard";
import { useBucket } from "@/hooks/useBucket";
import { useGetData } from "@/hooks/useGetData";
import { useEffect, useState } from "react";
import { Checkbox } from "@headlessui/react";
import PaymentPage from "./_component/Payment";
import { useAuth } from "@/hooks/useAuth";
import { Customer, Payment } from "@/types/Payment.types";
import { nanoid } from "nanoid";
import { useBucketContext } from "@/contexts/bucket.context";
import { genOrderName } from "@/utils/genOrderName";
import { getCurrentISODtate } from "@/utils/getCurrentISODate";
import { usePayment } from "@/hooks/usePayment";

function BucketPage() {
  const { setPayment, payment, setStep, step } = useBucketContext();
  const { remove } = useBucket();
  const { append } = usePayment();
  const [ids, setIds] = useState<string[]>([]);
  const { getUserInfo } = useAuth();
  const { data: userInfo, isLoading: userLoading } = getUserInfo;
  const { getBucketPageData } = useGetData(userInfo!);
  const { data: bucketData, isLoading: bucketLoading } = getBucketPageData;
  useEffect(() => {
    if (userInfo && bucketData) {
      setPayment({
        orderName: genOrderName(bucketData),
        approvedAt: getCurrentISODtate(),
        receipt: { url: "none" },
        method: "가상계좌",
        orderId: nanoid(),
        paymentKey: nanoid(),
        totalAmount: bucketData.totalPrice ?? 0,
        customerName: userInfo.userName,
        customerEmail: userInfo.email,
        customerMobilePhone: userInfo.phoneNumber,
        customerId: userInfo.id,
      });
    }
  }, [userInfo, bucketData, setPayment]);

  if (bucketLoading && userLoading) {
    return <Loading />;
  }

  const handlePayment = (payment: Payment | null) => {
    append.mutate(payment);
    setStep("payment");
  };
  const handleSelectAllIds = () => {
    const bucketDataIds: string[] = [];
    if (ids.length === 0) {
      bucketData?.bucket.forEach((content) => {
        bucketDataIds.push(content.id);
      });
      setIds(bucketDataIds);
    } else {
      setIds([]);
    }
  };

  return (
    <main className="flex items-center justify-center min-w-[800px]">
      <div className="flex flex-col w-full bg-white shadow-lg rounded-xl">
        <header className="w-full h-20 flex items-center justify-center text-3xl font-semibold text-white bg-[#BD76FF]">
          장바구니
        </header>

        <section className="relative p-6 flex flex-col gap-4 flex-1">
          {step === "product" && (
            <>
              <div className="flex items-center justify-between w-full rounded-lg px-4 py-4 bg-[#EADFFC]">
                <div className="absolute right-10 bottom-10 max-w-32">
                  <Button
                    onClick={() => handlePayment(payment)}
                    variant={"outline"}
                    size={"lg"}
                  >
                    결제
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={ids.length === bucketData?.bucket.length}
                    onChange={handleSelectAllIds}
                    className="group block size-6 rounded border-2 border-[#BD76FF] bg-white data-[checked]:bg-[#BD76FF] transform duration-200 hover:cursor-pointer"
                  />
                  <span className="text-lg text-[#5A3E91] font-medium">
                    전체선택 {ids.length}/{bucketData?.bucket.length}
                  </span>
                </div>
                <div className="max-w-32">
                  <Button
                    onClick={() => {
                      remove.mutate(ids);
                      setIds([]);
                    }}
                    intent="primary"
                    variant="outline"
                    size={"md"}
                  >
                    선택삭제
                  </Button>
                </div>
              </div>

              <div className="overflow-y-auto min-h-[60vh] max-h-[70vh] rounded-lg bg-white px-4 py-4 shadow-md border border-[#EADFFC] custom-scrollbar">
                <div className="flex items-center justify-between w-full pb-2 border-b border-[#EADFFC]">
                  <span className="text-lg font-semibold text-[#5A3E91]">
                    상품 목록
                  </span>
                  <span className="text-lg font-semibold text-[#5A3E91]">
                    총 금액 : {bucketData?.totalPrice}
                  </span>
                </div>

                {bucketData?.bucket.length! > 0 ? (
                  <div className="py-4">
                    {bucketData?.bucket.map((content) => (
                      <BucketContentCard
                        key={content.id}
                        content={content}
                        setIds={setIds}
                        ids={ids}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="flex justify-center pt-20 text-center text-gray-500 text-3xl">
                    장바구니가 비어 있습니다.
                  </span>
                )}
              </div>
            </>
          )}

          {step === "payment" && <PaymentPage />}
        </section>
      </div>
    </main>
  );
}

export default BucketPage;
