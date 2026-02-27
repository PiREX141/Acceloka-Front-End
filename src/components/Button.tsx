"use client";

import React, { HTMLAttributes, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
import { usePathname, useRouter } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("font-josefin transition focus:outline-none", {
  variants: {
    variant: {
      navbar: "text-primary",
      general: "text-secondary p-8 bg-foreground rounded-md",
      image: "",
    },
    fontSize: {
      md: "text-base",
      lg: "text-3xl",
      title: "text-4xl",
    },
    hoverBehavior: {
      bolded: "hover:font-bold",
      standard: "hover:font-normal",
    },
  },
  defaultVariants: {
    variant: "general",
    fontSize: "md",
    hoverBehavior: "standard",
  },
});

type ButtonProps = {
  children: ReactNode;
  toPage?: string;
  activeBold?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  fontSize,
  hoverBehavior,
  toPage,
  activeBold = false,
  onClick,
  className,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = activeBold && toPage && pathname === toPage;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (toPage) {
      router.push(toPage);
    }
  };

  return (
    <button
      className={`${buttonVariants({ variant, fontSize, hoverBehavior })} ${isActive ? "font-bold" : ""} ${className ?? ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
