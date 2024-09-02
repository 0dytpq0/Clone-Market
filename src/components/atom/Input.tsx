"use client";

import ArrowCircleRightIcon from "@/assets/icons/arrow-circle-right.svg";
import { ComponentProps, forwardRef, useId, useState } from "react";

type InputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  label?: string;
  handleSubmit?: () => void;
  innerClassName?: string;
  formType: string;
} & ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      setInputValue,
      inputValue,
      handleSubmit,
      innerClassName,
      formType,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const inputUid = useId();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setIsSubmit(true);
        setIsFocused(false);
        if (handleSubmit) {
          handleSubmit();
        }
      }
    };

    return (
      <div className={`relative w-full flex items-center ${innerClassName}`}>
        {label && (
          <label
            htmlFor={inputUid}
            className={`absolute text-[#86868B] left-4 transition-all duration-200 ease-in-out pointer-events-none ${
              isFocused || inputValue ? "text-[10px] top-2" : "text-sm "
            }`}
          >
            {label}
          </label>
        )}
        <input
          id={inputUid}
          {...props}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-14 pt-[18px] pl-4 pr-[43px] border border-[#86868B] rounded-lg outline-none focus:border-2 focus:border-[#0071e3]"
        />
        {formType === "login" && !isSubmit && (
          <ArrowCircleRightIcon
            className={`absolute right-3 transition-all duration-200 ease-in-out hover:cursor-pointer ${
              isFocused || inputValue
                ? "transform translate-y-[10px]"
                : "transform translate-y-0"
            }`}
            width={30}
            height={30}
            fill={"#86868B"}
            onClick={handleSubmit}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
