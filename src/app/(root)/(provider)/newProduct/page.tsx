"use client";
import Loading from "@/components/atom/Loading";
import ContentCard from "@/components/molecules/ContentCard";
import { useGetData } from "@/hooks/useGetData";
import { DefaultContentType } from "@/types/Content.types";
import { apiFetch } from "@/utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

function newProductPage() {
  const { getNewProductpageData } = useGetData();

  if (getNewProductpageData.isLoading) {
    return <Loading />;
  }

  const data = getNewProductpageData.data;
  console.log(data);
  return (
    <div>
      <h1>신상품</h1>
      <div className="grid grid-cols-3">
        {data.map((content: DefaultContentType) => {
          return (
            <div className="w-full h-[500px]">
              <ContentCard key={content.id} content={content} />;
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default newProductPage;
