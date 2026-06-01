import type React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className,children, ...props }: LabelProps) => {
  return (
    <>
      <label className={`${className}`} {...props}>{children}</label>
    </>
  );
};
