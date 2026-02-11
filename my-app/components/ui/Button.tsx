import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800":
              variant === "primary",
            "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950":
              variant === "secondary",
            "border-2 border-slate-200 bg-transparent text-slate-900 hover:border-slate-300 hover:bg-slate-50":
              variant === "outline",
            "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100":
              variant === "ghost",
          },
          {
            "h-9 px-4 text-sm rounded-md": size === "sm",
            "h-11 px-6 text-base rounded-lg": size === "md",
            "h-14 px-8 text-lg rounded-xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
