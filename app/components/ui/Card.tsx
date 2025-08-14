"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg shadow-card border border-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
