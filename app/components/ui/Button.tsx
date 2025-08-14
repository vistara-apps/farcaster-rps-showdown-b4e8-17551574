"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white focus:ring-primary",
    secondary: "bg-surface border border-primary/20 hover:bg-primary/5 text-primary focus:ring-primary",
    icon: "bg-transparent hover:bg-surface text-primary p-2"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        variant !== "icon" && sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
