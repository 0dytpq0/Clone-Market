"use client";

import { useGetData } from "@/hooks/useGetData";
import { DefaultContentType } from "@/types/Content.types";
import Loading from "../atom/Loading";
import ContentCard from "../molecules/ContentCard";

function NewProductPageContent() {
  const { getNewProductpageData } = useGetData();

  if (getNewProductpageData.isLoading) {
    return <Loading />;
  }

  const data = getNewProductpageData.data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data.map((content: DefaultContentType) => {
        return (
          <div key={content.id} className="relative w-full h-[500px]">
            <ContentCard content={content} />
          </div>
        );
      })}
    </div>
  );
}

export default NewProductPageContent;
