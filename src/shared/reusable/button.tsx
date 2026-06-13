import type React from "react";
import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large" | "icon";
};

const ButtonBgColour: Record<string, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100",
};

const ButtonSize: Record<string, string> = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
  icon: "p-2",
};

export const Button = ({
  className,
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded cursor-pointer transition-colors",
        ButtonBgColour[variant],
        ButtonSize[size],
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
