"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline-primary"
    | "outline-secondary"
    | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-[16px] font-medium transition-colors",
        "text-[24px]", // 24px Bold

        // Variant styles
        variant === "primary" && [
          "bg-[#FFA726] hover:bg-[#F57C00] text-white", // 메인 주황 -> 호버시 진한 주황
          // 그림자 효과
        ],
        variant === "secondary" && [
          "bg-[#4A90E2] hover:bg-[#1976D2] text-white", // 메인 파랑 -> 호버시 진한 파랑
          "shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]",
        ],
        // Outline variants
        variant === "outline-primary" && [
          "border-2 border-[#4A90E2] text-[#4A90E2]", // 파랑 테두리
          "hover:bg-[#E3F2FD]", // 호버시 연한 파랑 배경
        ],
        variant === "outline-secondary" && [
          "border-2 border-[#FFA726] text-[#FFA726]", // 주황 테두리
          "hover:bg-[#FFF3E0]", // 호버시 연한 주황 배경
        ],

        // Size styles
        size === "sm" && "h-10 px-4",
        size === "md" && "h-12 px-6",
        size === "lg" && "h-14 px-8",

        className
      )}
      {...props}
    />
  );
}
