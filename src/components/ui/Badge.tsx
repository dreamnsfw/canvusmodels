import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info" | "premium";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", size = "sm", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border",
        {
          "bg-white/5 text-white/70 border-white/10": variant === "default",
          "bg-success/10 text-success border-success/20": variant === "success",
          "bg-warning/10 text-warning border-warning/20": variant === "warning",
          "bg-error/10 text-error border-error/20": variant === "error",
          "bg-info/10 text-info border-info/20": variant === "info",
          "bg-accent-500/10 text-accent-300 border-accent-500/20": variant === "premium",
        },
        {
          "px-2.5 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
