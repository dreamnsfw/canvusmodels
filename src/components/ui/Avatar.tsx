import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-accent-500/20 flex items-center justify-center font-medium text-accent-300 shrink-0",
        {
          "w-7 h-7 text-xs": size === "sm",
          "w-9 h-9 text-sm": size === "md",
          "w-12 h-12 text-base": size === "lg",
        },
        className
      )}
    >
      {src ? (
        <img src={src} alt={name || "User"} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
