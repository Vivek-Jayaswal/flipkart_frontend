import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={`border border-gray-400 rounded cursor-pointer ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};
