import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "border-blue-400/30 bg-blue-500/15 text-blue-300 backdrop-blur-md",
    secondary: "border-white/10 bg-white/5 text-slate-200 backdrop-blur-md",
    destructive: "border-red-400/30 bg-red-500/15 text-red-300 backdrop-blur-md",
    outline: "text-slate-300 border-white/15 bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
