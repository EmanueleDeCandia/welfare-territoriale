import * as React from "react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "warning" | "success" | "info";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-white/5 text-slate-200 border-white/10 backdrop-blur-md",
      destructive: "border-rose-500/30 bg-rose-500/10 text-rose-200 [&>svg]:text-rose-400 backdrop-blur-md",
      warning: "border-amber-500/30 bg-amber-500/10 text-amber-200 [&>svg]:text-amber-400 backdrop-blur-md",
      success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 [&>svg]:text-emerald-400 backdrop-blur-md",
      info: "border-blue-500/30 bg-blue-500/10 text-blue-200 [&>svg]:text-blue-400 backdrop-blur-md",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-2xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-300",
          variants[variant] || variants.default,
          className
        )}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
