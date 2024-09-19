"use client";
import AddIcon from "@/assets/icons/add.svg";
import CloseIcon from "@/assets/icons/close.svg";
import RemoveIcon from "@/assets/icons/remove.svg";
import { useBucket } from "@/hooks/useBucket";
import { BucketContentType } from "@/types/Content.types";
import { Checkbox } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
type BucketContentCardProps = {
  content: BucketContentType;
};

function BucketContentCard({ content }: BucketContentCardProps) {
  const [enabled, setEnabled] = useState(false);
  const { remove } = useBucket();

  return (
    <div className="flex flex-col gap-y-4 w-full my-4">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <Checkbox
            checked={enabled}
            onChange={setEnabled}
            className="group block size-5 rounded border-2 bg-white data-[checked]:bg-black transform duration-200 hover:cursor-pointer"
          />
          <span>{content.h3Texts[0]}</span>
        </div>
        <div>
          <CloseIcon
            className={"hover:cursor-pointer"}
            onClick={() => remove.mutate(content.id)}
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="relative w-20 h-24 aspect-auto">
          <Image
            alt={content.h3Texts[0]}
            src={content.images[0] ?? "/"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center space-x-1 font-bold">
            <span>{content.spanTexts[6]}</span>
            <span className="text-[#B5B5B5] line-through">
              {content.spanTexts[2]}
            </span>
          </div>
          <div className="flex items-center justify-around w-24 h-9 bg-gray-400 rounded-3xl p-2">
            <AddIcon className={"hover:cursor-pointer"} fill={"white"} />
            <span className="text-white">{content.order}</span>
            <RemoveIcon className={"hover:cursor-pointer"} fill={"white"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BucketContentCard;
