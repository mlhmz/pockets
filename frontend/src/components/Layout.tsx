import {
  Car,
  CircleSlash,
  Heater,
  LayoutDashboard,
  ShieldCheck,
  TreePalm,
  Tv,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Link = {
  icon: ReactNode;
  text: string;
  href: string;
};

const links: Link[] = [
  {
    icon: <LayoutDashboard />,
    text: "Dashboard",
    href: "/",
  },
  {
    icon: <TreePalm />,
    text: "Vacation",
    href: "/category/vacation",
  },
  {
    icon: <ShieldCheck />,
    text: "Liability",
    href: "/category/liability",
  },
  {
    icon: <Heater />,
    text: "Gas",
    href: "/category/gas",
  },
  {
    icon: <Car />,
    text: "Car Insurance",
    href: "/category/car-insurance",
  },
  {
    icon: <Tv />,
    text: "Public Broadcast",
    href: "/category/public-broadcast",
  },
  {
    icon: <CircleSlash />,
    text: "No Category",
    href: "/category/no-category",
  },
];

export const Layout = () => {
  return (
    <div className="flex">
      <div>
        <div className="flex flex-shrink flex-col gap-3 p-5">
          <h1 className="font-bold">Savings</h1>
          {links.map((link) => (
            <NavLink
              className={({ isActive }) => cn(isActive ? "text-primary" : "")}
              to={link.href}
            >
              <Button
                className="flex justify-start items-center gap-1 font-bold w-full hover:text-primary"
                variant={"ghost"}
              >
                {link.icon}
                <p>{link.text}</p>
              </Button>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};
