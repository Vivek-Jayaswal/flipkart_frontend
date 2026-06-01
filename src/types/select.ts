export interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;

  value: string;
  setValue: (value: string) => void;
}
