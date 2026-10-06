import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value || 0));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        className={cn(
          "relative h-2.5 w-full overflow-hidden rounded-full bg-black/40 border border-white/10 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
