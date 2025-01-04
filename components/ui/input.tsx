"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[52px] w-full rounded-[16px] border border-[#E2E8F0] bg-white px-5 py-4",
        "placeholder:text-[#94A3B8]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
