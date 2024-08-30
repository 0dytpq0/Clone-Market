"use client";

import ArrowCircleRightIcon from "@/assets/icons/arrow-circle-right.svg";
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  forwardRef,
  useId,
  useState,
} from "react";

type InputProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  label?: string;
  handleSubmit: () => void;
  innerClassName?: string;
  inputRef?: React.Ref<HTMLInputElement>;
} & ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    setInputValue,
    inputValue,
    handleSubmit,
    inputRef,
    innerClassName,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const inputUid = useId();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setIsSubmit(true);
        setIsFocused(false);
        handleSubmit();
      }
    };

    return (
      <div className={`relative w-full flex items-center ${innerClassName}`}>
        {label && (
          <label
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
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-full h-14 pt-[18px] pl-4 pr-[43px] border border-[#86868B] rounded-lg outline-none focus:border-2 focus:border-[#0071e3]"
        />
        {!isSubmit && (
          <ArrowCircleRightIcon
            onClick={() => console.log(123)}
            className={`absolute right-3 transition-all duration-200 ease-in-out hover:cursor-pointer ${
              isFocused || inputValue
                ? "transform translate-y-[10px]"
                : "transform translate-y-0"
            }`}
            width={30}
            height={30}
            fill={"#86868B"}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
