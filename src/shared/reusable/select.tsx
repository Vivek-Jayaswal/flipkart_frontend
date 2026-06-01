import { createContext, useContext } from "react";
import { SelectContextType } from "../../types/select";

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be inside Select");
  }

  return context;
}

type SelectProps = {
  children: React.ReactNode;
  // defaultValue?: string;
};

export const Select = ({ children }: SelectProps) => {
  return <div className="relative">{children}</div>;
};

type SelectTriggerProps = {
  children: React.ReactNode;
};

export const SelectTrigger = ({ children }: SelectTriggerProps) => {
  return (
    <div className="w-full h-10 border border-gray-300 rounded-md flex items-center justify-between px-3 cursor-pointer">
      {children}
    </div>
  );
};

type SelectValueProps = {
  placeholder?: string;
};

export const SelectValue = ({ placeholder }: SelectValueProps) => {
  return <span>{placeholder}</span>;
};

type SelectContentProps = {
  children?: React.ReactNode;
};

export const SelectContent = ({ children }: SelectContentProps) => {
  return (
    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
      {children}
    </div>
  );
};

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};

export const SelectItem = ({ value, children }: SelectItemProps) => {
  return <div>{children}</div>;
};
