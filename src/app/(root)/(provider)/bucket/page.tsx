"use client";
import Button from "@/components/atom/Button";
import Loading from "@/components/atom/Loading";
import BucketContentCard from "@/components/molecules/BucketContentCard";
import { useBucket } from "@/hooks/useBucket";
import { useGetData } from "@/hooks/useGetData";
import { BucketContentType } from "@/types/Content.types";
import { Checkbox } from "@headlessui/react";
import { useState } from "react";

function BucketPage() {
  const { getBucketPageData } = useGetData();
  const { remove } = useBucket();
  const [ids, setIds] = useState<string[]>([]);

  if (getBucketPageData.isLoading) {
    return <Loading />;
  }

  const handleSelectAllIds = () => {
    const bucketDataIds: string[] = [];
    if (ids.length === 0) {
      bucketData.forEach((content) => {
        bucketDataIds.push(content.id);
      });
      setIds(bucketDataIds);
    } else {
      setIds([]);
    }
  };

  const bucketData: BucketContentType[] = getBucketPageData.data!;

  return (
    <main className="flex items-center justify-center min-w-[800px]">
      <div className="flex flex-col w-full bg-white shadow-lg rounded-xl">
        {/* 헤더 */}
        <header className="w-full h-20 flex items-center justify-center text-3xl font-semibold text-white bg-[#BD76FF]">
          장바구니
        </header>

        {/* 장바구니 컨텐츠 */}
        <section className="p-6 flex flex-col gap-4 flex-1">
          {/* 전체 선택 & 삭제 버튼 */}
          <div className="flex items-center justify-between w-full rounded-lg px-4 py-4 bg-[#EADFFC]">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={ids.length === bucketData.length}
                onChange={handleSelectAllIds}
                className="group block size-6 rounded border-2 border-[#BD76FF] bg-white data-[checked]:bg-[#BD76FF] transform duration-200 hover:cursor-pointer"
              />
              <span className="text-lg text-[#5A3E91] font-medium">
                전체선택 {ids.length}/{bucketData?.length}
              </span>
            </div>
            <Button
              onClick={() => {
                remove.mutate(ids);
                setIds([]);
              }}
              intent="secondary"
              variant="outline"
              className="border-[#BD76FF] text-[#BD76FF] hover:bg-[#BD76FF] hover:text-white transition"
            >
              선택삭제
            </Button>
          </div>

          {/* 상품 목록 */}
          <div className="overflow-y-auto min-h-[60vh] max-h-[70vh] rounded-lg bg-white px-4 py-4 shadow-md border border-[#EADFFC] custom-scrollbar">
            <div className="flex items-center justify-between w-full pb-2 border-b border-[#EADFFC]">
              <span className="text-lg font-semibold text-[#5A3E91]">
                상품 목록
              </span>
            </div>

            {bucketData.length > 0 ? (
              <div className="py-4">
                {bucketData.map((content) => (
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
        </section>
      </div>
    </main>
  );
}

export default BucketPage;
