"use client";

import { Dispatch, SetStateAction } from "react";

type SortTagMenuProps = {
  onClickFn: Dispatch<SetStateAction<string>>;
};

function SortTagMenu({ onClickFn: setSortStandard }: SortTagMenuProps) {
  const TAGS = ["낮은 가격순", "높은 가격순"];
  return (
    <div className="flex justify-end space-x-4 my-3 py-1 border-b text-gray-400 text-sm">
      {TAGS.map((tag, idx) => (
        <span
          key={idx}
          onClick={() => setSortStandard(idx === 0 ? "asc" : "desc")}
          className="cursor-pointer hover:text-black focus:text-black"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default SortTagMenu;
