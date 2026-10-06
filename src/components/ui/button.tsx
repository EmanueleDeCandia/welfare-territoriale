import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]";
    
    const variants: Record<string, string> = {
      default: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/40 border border-blue-400/30",
      destructive: "bg-red-600/80 hover:bg-red-600 text-white border border-red-500/30 shadow-md",
      outline: "border border-white/12 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md shadow-sm",
      secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/10 backdrop-blur-md",
      ghost: "hover:bg-white/10 text-slate-300 hover:text-white",
      link: "text-blue-400 underline-offset-4 hover:underline",
    };

    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-11 rounded-lg px-8 text-base",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant] || variants.default, sizes[size] || sizes.default, className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
