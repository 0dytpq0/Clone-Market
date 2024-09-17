"use client";

import { useGetData } from "@/hooks/useGetData";
import { DefaultContentType } from "@/types/Content.types";
import sortByPrice from "@/utils/sortByPrice";
import { useMemo, useState } from "react";
import Loading from "../atom/Loading";
import ContentCard from "../molecules/ContentCard";
import SortTagMenu from "../molecules/SortTagMenu";

function NewProductPageContent() {
  const [sortStandard, setSortStandard] = useState<string>("asc");
  const { getNewProductpageData } = useGetData();
  const data = useMemo(
    () => sortByPrice(getNewProductpageData.data, sortStandard),
    [getNewProductpageData?.data, sortStandard]
  );

  if (getNewProductpageData.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SortTagMenu onClickFn={setSortStandard} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((content: DefaultContentType) => {
          return (
            <div key={content.id} className="relative w-full h-[500px]">
              <ContentCard content={content} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default NewProductPageContent;
