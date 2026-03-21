import { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  name: string;
  to: string;
  Icon?: React.ElementType;
  Icon2?: React.ElementType;
  popover?: React.ReactNode;
};

export function NavItem({ name, to, Icon, Icon2, popover }: Props) {
  const [open, setOpen] = useState(false);

  let timeout: any;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        timeout = setTimeout(() => setOpen(true), 120);
      }}
      onMouseLeave={() => {
        clearTimeout(timeout);
        setOpen(false);
      }}
    >
      <NavLink to={to} className="flex items-center gap-2">
        {Icon && <Icon size={18} />}
        <span>{name}</span>
        {Icon2 && <Icon2 size={16} />}
      </NavLink>
      {open && popover}
    </div>
  );
}
