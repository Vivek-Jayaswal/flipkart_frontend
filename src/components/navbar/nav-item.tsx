import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

type Props = {
  name: string;
  to: string;
  Icon?: React.ElementType;
  Icon2?: React.ElementType;
  popover?: React.ReactNode;
  helightWhenActive?: boolean;
  activeClassName?: string;
  className?: string;
  totalCount?: number;
  totalCountClassName?: string;
};

export function NavItem({
  name,
  to,
  Icon,
  Icon2,
  popover,
  helightWhenActive,
  activeClassName,
  className,
  totalCount = 0,
  totalCountClassName,
}: Props) {
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
      <NavLink
        to={to}
        end={helightWhenActive}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 py-1 px-3",
            className,
            helightWhenActive &&
              isActive &&
              (activeClassName ||
                "bg-blue-50 rounded-md text-blue-700 font-medium"),
          )
        }
      >
        {Icon && <Icon size={18} />}
        <span>{name}</span>
        {Icon2 && <Icon2 size={16} />}
      </NavLink>
      {open && popover}
      {totalCount > 0 && (
        <p
          className={cn(
            "text-[10px] absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center bg-amber-500",
            totalCountClassName,
          )}
        >
          {totalCount}
        </p>
      )}
    </div>
  );
}
