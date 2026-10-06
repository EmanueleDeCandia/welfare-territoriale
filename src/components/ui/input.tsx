import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-blue-500/80 focus-visible:ring-1 focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
