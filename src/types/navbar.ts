import type { LucideProps } from "lucide-react";
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

export type NavbarRightSideType = {
  name: string;
  pathName: string;
  icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    | string;
};

export type LoginType = {
  email: string;
  password: string;
};
