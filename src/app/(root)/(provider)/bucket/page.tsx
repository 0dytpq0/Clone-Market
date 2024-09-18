"use client";
import { useGetData } from "@/hooks/useGetData";

function BucketPage() {
  const { getBucketPageData } = useGetData();

  console.log("getBucketPageData.data", getBucketPageData.data);
  return (
    <div className="mx-8 bg-[#f2f5f8] h-[700px] ">
      <h1 className="w-full flex items-center justify-center text-3xl font-semibold py-5">
        장바구니
      </h1>
    </div>
  );
}

export default BucketPage;
