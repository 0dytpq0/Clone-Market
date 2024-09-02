"use client";

import ArrowCircleRightIcon from "@/assets/icons/arrow-circle-right.svg";
import WarningIcon from "@/assets/icons/warning.svg";
import { VariantProps, cva } from "class-variance-authority";
import { DebouncedFunc } from "lodash";
import { ComponentProps, forwardRef, useId, useState } from "react";
type ValidatorFunction =
  | ((value: string, extraValue?: string) => string | null)
  | DebouncedFunc<(value: string, extraValue?: string) => string | null>;

type InputProps = InputVariantProps & {
  inputValue: string;
  setInputValue: (value: string) => void;
  label?: string;
  handleSubmit?: () => void;
  innerClassName?: string;
  formType: string;
  validator: ValidatorFunction;
} & ComponentProps<"input">;

type InputVariantProps = VariantProps<typeof InputVariant>;

const InputVariant = cva(
  "w-full h-14 pt-[18px] pl-4 pr-[43px] border border-[#86868B] rounded-lg outline-none top-2",
  {
    variants: {
      variant: {
        primary:
          "border border-[#86868B] focus:border-2 focus:border-[#0071e3]",
        warning: "border border-red-500 focus:border-2 focus:border-red-700",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      setInputValue,
      inputValue,
      handleSubmit,
      innerClassName,
      formType,
      validator,
      variant,
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
      <>
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
            className={InputVariant({
              variant:
                validator(inputValue) !== null && inputValue.length !== 0
                  ? "warning"
                  : "primary",
            })}
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
        {validator(inputValue) !== null && inputValue.length !== 0 && (
          <p className="flex items-center gap-x-2 text-[10px] text-[#EA5E6C]">
            <WarningIcon width={14} height={14} fill={"#EA5E6C"} />
            {validator(inputValue)}
          </p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
