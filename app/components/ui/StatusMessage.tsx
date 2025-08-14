"use client";

import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface StatusMessageProps {
  variant: "info" | "success" | "error";
  children: ReactNode;
  className?: string;
}

export function StatusMessage({ variant, children, className }: StatusMessageProps) {
  const variants = {
    info: "bg-blue-50 text-blue-700 border-blue-200",
    success: "bg-green-50 text-green-700 border-green-200",
    error: "bg-red-50 text-red-700 border-red-200"
  };

  return (
    <div
      className={cn(
        "px-4 py-3 rounded-md border text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
