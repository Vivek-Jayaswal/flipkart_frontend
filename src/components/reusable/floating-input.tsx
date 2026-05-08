import React from "react";
import { Button } from "./button";
import { cn } from "../../utils/cn";

type FloatingInputProps = {
  label: string;
  id: string;
  error?: boolean;
  isBgLable?: boolean;
  LeftIcon?: React.ElementType;
  rightElement?: React.ReactNode;
  rightElementClass?: string;
  togglePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FloatingInput = ({
  label,
  id,
  value,
  className,
  LeftIcon,
  rightElementClass,
  rightElement,
  togglePassword,
  isBgLable,
  ...props
}: FloatingInputProps) => {
  return (
    <div className="relative w-full">
      {LeftIcon && (
        <span>
          <LeftIcon size={18} />
        </span>
      )}
      <input
        id={id}
        value={value}
        placeholder=" "
        className={`
          peer w-full border-b border-gray-300 bg-transparent
          outline-none py-2 transition-all
          focus:border-blue-500
          ${className}
          ${rightElement ? "pr-10" : ""}
        `}
        {...props}
      />

      {rightElement && (
        <div className={cn("absolute right-2 top-3.5", rightElementClass)}>
          {rightElement}
        </div>
      )}

      <label
        htmlFor={id}
        className={`
            absolute left-0 px-1 text-gray-400 transition-all duration-200 top-2 peer-placeholder-shown:top-2
            ${
              isBgLable
                ? "peer-focus:-top-3 peer-[&:not(:placeholder-shown)]:-top-3 left-4 text-sm peer-focus:bg-white peer-[&:not(:placeholder-shown)]:bg-white"
                : "peer-focus:-top-4 peer-[&:not(:placeholder-shown)]:-top-4"
            }

        `}
      >
        {label}
      </label>
    </div>
  );
};
