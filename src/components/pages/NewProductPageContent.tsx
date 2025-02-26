"use client"; // ✅ 클라이언트 컴포넌트로 지정

import { useGetData } from "@/hooks/useGetData";
import { useState, useRef, useCallback, useMemo } from "react";
import sortByPrice from "@/utils/sortByPrice";
import Loading from "../atom/Loading";
import ContentCard from "../molecules/ContentCard";
import SortTagMenu from "../molecules/SortTagMenu";

function NewProductPageContent() {
  const [sortStandard, setSortStandard] = useState<"asc" | "desc">("asc");
  const { getNewProductPageData } = useGetData();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getNewProductPageData;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const sortedData = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => sortByPrice(page.data, sortStandard));
  }, [data, sortStandard]);

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
        {sortedData.map((content, index) => {
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
