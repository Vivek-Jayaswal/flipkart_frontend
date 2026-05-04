import React from "react";
import { Button } from "./button";

type FloatingInputProps = {
  label: string;
  id: string;
  error?: boolean;
  isBgLable?: boolean;
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
          ${RightIcon ? "pr-10" : ""}
        `}
        {...props}
      />

      {RightIcon && (
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={togglePassword}
          className="absolute right-2 top-4 hover:bg-transparent p-0 border-none"
        >
          <RightIcon size={18} />
        </Button>
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
