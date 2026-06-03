"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none",
          "active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-accent-600 text-white hover:bg-accent-500 shadow-lg shadow-accent-600/20": variant === "primary",
            "bg-white/5 text-white hover:bg-white/10 border border-white/10": variant === "secondary",
            "text-white/70 hover:text-white hover:bg-white/5": variant === "ghost",
            "bg-error/10 text-error hover:bg-error/20 border border-error/20": variant === "danger",
            "border border-white/15 text-white/80 hover:text-white hover:bg-white/5": variant === "outline",
          },
          {
            "h-9 px-4 text-sm rounded-lg": size === "sm",
            "h-10 px-5 text-sm rounded-xl": size === "md",
            "h-12 px-8 text-base rounded-xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
