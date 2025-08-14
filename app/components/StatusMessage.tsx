
"use client";

import { ReactNode } from "react";

interface StatusMessageProps {
  variant?: "info" | "success" | "error";
  children: ReactNode;
  className?: string;
}

export function StatusMessage({ 
  variant = "info", 
  children, 
  className = "" 
}: StatusMessageProps) {
  const variantClasses = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800"
  };
  
  const iconEmojis = {
    info: "ℹ️",
    success: "✅",
    error: "❌"
  };
  
  return (
    <div className={`border rounded-md p-4 ${variantClasses[variant]} ${className} animate-slide-up`}>
      <div className="flex items-center space-x-2">
        <span>{iconEmojis[variant]}</span>
        <div className="body-text">{children}</div>
      </div>
    </div>
  );
}
