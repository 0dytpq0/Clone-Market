"use client";

import { useGetData } from "@/hooks/useGetData";
import { DefaultContentType } from "@/types/Content.types";
import { useState, useRef, useCallback, useMemo } from "react";
import Loading from "../atom/Loading";
import ContentCard from "../molecules/ContentCard";
import SortTagMenu from "../molecules/SortTagMenu";
import sortByPrice from "@/utils/sortByPrice";

function NewProductPageContent() {
  const [sortStandard, setSortStandard] = useState<string>("asc");

  const { getNewProductPageData } = useGetData();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getNewProductPageData;
  const sortedData = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => sortByPrice(page.data, sortStandard));
  }, [data, sortStandard]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasNextPage || !node) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 }
      );

      observerRef.current.observe(node);
    },
    [hasNextPage, fetchNextPage]
  );

  if (getNewProductPageData.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SortTagMenu onClickFn={setSortStandard} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sortedData.map((content: DefaultContentType, index) => {
          const isLast = index === sortedData.length - 1;
          return (
            <div
              key={content.id}
              className="relative w-full h-[500px]"
              ref={isLast ? lastElementRef : null}
            >
              <ContentCard content={content} />
            </div>
          );
        })}
      </div>

      {isFetchingNextPage && <Loading />}
    </>
  );
}

export default NewProductPageContent;
