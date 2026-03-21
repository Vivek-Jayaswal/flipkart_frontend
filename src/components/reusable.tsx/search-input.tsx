type inputProps = {
  onChange?: () => void;
  value?: string;
  type?: string;
  className: string;
  id?: string;
};

export const Input = ({
  onChange,
  value,
  id,
  type = "text",
  className,
}: inputProps) => {
  return (
    <>
      <input
        id={id}
        className={`h-9 ${className}`}
        type={type}
        onChange={onChange}
        value={value}
      />
    </>
  );
};
