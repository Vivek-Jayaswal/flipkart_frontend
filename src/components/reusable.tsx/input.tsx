import type React from "react";

type inputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: inputProps) => {
  return (
    <>
      <input className={`h-9 ${className}`} {...props} />
    </>
  );
};
