"use client";
import Button from "@/components/atom/Button";
import Loading from "@/components/atom/Loading";
import BucketContentCard from "@/components/molecules/BucketContentCard";
import { useGetData } from "@/hooks/useGetData";
import { BucketContentType } from "@/types/Content.types";
import mergeBucketProducts from "@/utils/mergeBucketProducts";
import { Checkbox } from "@headlessui/react";
import { useState } from "react";

// TODO 개별 체크 가능하도록 + 삭제, 결제 기능 추가 후 배포
function BucketPage() {
  const { getBucketPageData } = useGetData();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [ids, setIds] = useState<string[]>([]);

  if (getBucketPageData.isLoading) {
    return <Loading />;
  }
  const bucketData: BucketContentType[] = mergeBucketProducts(
    getBucketPageData.data!
  );
  console.log("ids", ids);
  return (
    <main className="mx-8 bg-[#f2f5f8] h-[700px]">
      <header className="w-full flex items-center justify-center text-3xl font-semibold py-4">
        장바구니
      </header>
      <section className="mx-8 flex flex-col gap-y-4 ">
        <div className="flex items-center justify-between w-full rounded-lg px-4 h-16 bg-white">
          <div className="flex items-center space-x-2 ">
            <Checkbox
              checked={ids.length === bucketData.length}
              onChange={() => {
                const bucketDataIds: string[] = [];
                if (ids.length === 0) {
                  bucketData.forEach((content) => {
                    bucketDataIds.push(content.id);
                  });
                  setIds(bucketDataIds);
                } else {
                  setIds([]);
                }
              }}
              className="group block size-5 rounded border-2 bg-white data-[checked]:bg-black transform duration-200 hover:cursor-pointer"
            />
            <span className="text-xl">전체선택 0/{bucketData?.length}</span>
          </div>
          <div className="flex items-center w-30 h-10">
            <Button intent={"secondary"} variant={"outline"}>
              선택삭제
            </Button>
          </div>
        </div>
        <div className="w-full max-h-[500px] overflow-y-scroll bg-white rounded-t-lg px-4">
          <div className="flex items-center justify-between w-full h-16 ">
            <span className="text-xl">상품 목록</span>
          </div>
          {bucketData && (
            <div>
              {bucketData.map((content) => {
                return <BucketContentCard key={content.id} content={content} />;
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default BucketPage;
