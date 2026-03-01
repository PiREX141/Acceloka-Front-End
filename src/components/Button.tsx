"use client";

import React, { HTMLAttributes, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
import { usePathname, useRouter } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("font-josefin transition focus:outline-none", {
  variants: {
    variant: {
      title: "text-primary",
      navbar: "text-subPrimary",
      general: "text-secondary p-5 bg-subPrimary rounded-2xl",
      image: "",
    },
    fontSize: {
      md: "text-2xl",
      lg: "text-3xl",
      title: "text-4xl",
    },
    hoverBehavior: {
      bolded: "hover:font-bold",
      glow: "transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]",
      standard: "hover:font-normal",
    },
  },
  defaultVariants: {
    variant: "general",
    fontSize: "md",
    hoverBehavior: "standard",
  },
});

const motionVariantMap = {
  primary: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  secondary: {
    whileHover: { rotate: 3, scale: 1.03 },
    whileTap: { scale: 0.95 },
  },
  danger: {
    whileHover: { x: [-2, 2, -2, 2, 0] }, // shake
    whileTap: { scale: 0.9 },
  },
};

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
