import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function Card({ className, children, hover = false, glass = true, onClick }: CardProps) {
  const Component = onClick ? "button" : "div";
  return (
    <Component
      onClick={onClick}
      className={cn(
        "rounded-xl border transition-all duration-300",
        glass && "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]",
        hover && "hover:border-accent-500/30 hover:shadow-hover hover:-translate-y-0.5 cursor-pointer",
        "shadow-card",
        className
      )}
    >
      {children}
    </Component>
  );
}
