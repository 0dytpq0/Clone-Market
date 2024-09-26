import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps } from "react";

type ButtonType = ButtonVariantProps &
  (
    | ({ href?: undefined } & ComponentProps<"button">)
    | ({ href: string } & ComponentProps<typeof Link>)
  );

type ButtonVariantProps = VariantProps<typeof buttonVariant>;

const buttonVariant = cva(
  "w-full h-full border rounded flex justify-center items-center font-semibold hover:brightness-90 active:brightness-75 transform duration-200",
  {
    variants: {
      intent: {
        primary: "border-[#BD76FF] ",
        secondary: "border-slate-500 ",
        danger: "border-rose-500 ",
      },
      size: {
        sm: "px-3 py-1 text-[13px]",
        md: "px-4 py-1.5  text-[15px]",
        lg: "px-5 py-2 text-[17px]",
      },
      variant: {
        outline: "bg-white",
        contained: "text-white",
      },
    },
    compoundVariants: [
      { intent: "primary", variant: "contained", className: "bg-[#BD76FF] " },
      { intent: "primary", variant: "outline", className: " text-[#BD76FF]" },
      { intent: "secondary", variant: "contained", className: "bg-slate-500 " },
      { intent: "secondary", variant: "outline", className: " text-slate-500" },
      { intent: "danger", variant: "contained", className: "bg-rose-500 " },
      { intent: "danger", variant: "outline", className: " text-rose-500" },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      variant: "contained",
    },
  }
);

function Button({ intent, size, variant, children, ...props }: ButtonType) {
  if (props.href) {
    return (
      <Link className={buttonVariant({ intent, size, variant })} {...props}>
        {children}
      </Link>
    );
  } else if (typeof props.href === "undefined") {
    return (
      <button className={buttonVariant({ intent, size, variant })} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
