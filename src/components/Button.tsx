"use client";

import React, { HTMLAttributes, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
import { usePathname, useRouter } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

const buttonVariants = cva("font-josefin transition focus:outline-none", {
  variants: {
    variant: {
      title: "text-primary",
      navbar: "text-subPrimary",
      general: "text-secondary p-4 bg-subPrimary rounded-2xl",
      image: "",
    },
    fontSize: {
      md: "text-2xl",
      lg: "text-3xl",
      title: "text-4xl",
    },
    hoverBehavior: {
      bolded: "transition-all duration-100 hover:font-bold",
      glow: "transition-all duration-350 hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]",
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
  VariantProps<typeof buttonVariants> &
  React.ComponentProps<typeof motion.button>;

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
  const hoverAnimation =
    variant !== "title"
      ? {
          scale: 1.1,
          transition: { duration: 0.1 },
        }
      : undefined;

  return (
    <motion.button
      whileHover={hoverAnimation}
      transition={{ duration: 0.1 }}
      className={`${buttonVariants({ variant, fontSize, hoverBehavior })} ${isActive ? "font-bold" : ""} ${className ?? ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
