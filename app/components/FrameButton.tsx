
"use client";

import { ReactNode } from "react";

interface FrameButtonProps {
  variant?: "primary" | "secondary" | "icon";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function FrameButton({ 
  variant = "primary", 
  onClick, 
  disabled = false, 
  children, 
  className = "" 
}: FrameButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : 
                   variant === "secondary" ? "btn-secondary" : "btn-icon";
  
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      className={`${baseClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
