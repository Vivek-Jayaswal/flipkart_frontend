import React from "react";
import { Button } from "./button";

type FloatingInputProps = {
  label: string;
  id: string;
  error?: boolean;
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;
  togglePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FloatingInput = ({
  label,
  id,
  value,
  className,
  LeftIcon,
  RightIcon,
  togglePassword,
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
          ${RightIcon ? "pr-10" : ""}
        `}
        {...props}
      />

      {RightIcon && (
        <Button onClick={togglePassword} className="absolute right-2 top-4 border-none">
          <RightIcon size={18} />
        </Button>
      )}

      <label
        htmlFor={id}
        className={`
          absolute left-0 transition-all duration-200 text-gray-400
          ${value ? "-top-4" : "top-2"}
          peer-focus:-top-4
        `}
      >
        {label}
      </label>
    </div>
  );
};
