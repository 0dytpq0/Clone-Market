"use client";

import ReviewIcon from "@/assets/icons/review.svg";
import { useBucket } from "@/hooks/useBucket";
import { DefaultContentType } from "@/types/Content.types";
import Image from "next/image";
import Button from "../atom/Button";

interface ContentCardProps {
  content: DefaultContentType;
  userId: string;
}

function ContentCard({ content, userId = "" }: ContentCardProps) {
  const { append } = useBucket();
  const contentData = { ...content, userId };
  console.log("contentData", contentData);
  return (
    <>
      <div className="w-full h-full relative aspect-auto max-h-[320px]">
        <Image
          alt="foodImg"
          src={content.images[0] ?? "/"}
          sizes=" (max-width: 640px) 100vw, 
    (max-width: 1024px) 50vw, 
    (max-width: 1440px) 33vw, 
    25vw"
          fill
          className="object-cover rounded-md"
          priority={true}
        />
      </div>
      <div className="w-full h-9 mt-[6px]">
        <Button
          onClick={() => append.mutate(contentData)}
          intent={"secondary"}
          size={"lg"}
          variant={"outline"}
        >
          담기
        </Button>
      </div>
      <h3 className="font-semibold mb-2 h-[49px] text-ellipsis line-clamp-2">
        {content.h3Texts[0]}
      </h3>
      {content.pTexts[0] && (
        <p className="absolute top-2 left-2 px-2 py-[6px] rounded-md bg-[#BD76FF] text-white font-semibold ">
          {content.pTexts[0]}
        </p>
      )}
      <p className="text-[#B5B5B5] line-through">{content.spanTexts[2]}</p>
      <div className="flex gap-x-2 text-xl">
        {content.spanTexts[5] && (
          <p className="text-[#FA622F] font-bold">{content.spanTexts[5]}</p>
        )}
        <p className="font-bold">{content.spanTexts[6]}</p>
      </div>
      <div className="text-sm text-[#B5B5B5] flex items-center gap-x-1 pt-2">
        <ReviewIcon width={14} height={14} fill={"#B5B5B5"} />
        {content.spanTexts[9] || 0}
      </div>
    </>
  );
}

export default ContentCard;
