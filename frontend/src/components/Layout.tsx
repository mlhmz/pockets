import { cn } from "@/lib/utils";
import {
  Car,
  CircleSlash,
  Heater,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  TreePalm,
  Tv,
  X,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

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
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div className="flex">
      <div>
        <div
          className={cn(
            "fixed bg-white md:static flex flex-shrink flex-col gap-3 p-5 h-screen z-10 border-r border-r-border shadow transition-all ease-in-out duration-300",
            showSideNav ? "left-0" : "left-[-100%]"
          )}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Savings</h1>
            <Button
              onClick={() => setShowSideNav(!showSideNav)}
              variant="secondary"
              className="md:hidden"
            >
              <X />
            </Button>
          </div>
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
      <div className="flex-grow overflow-y-auto h-screen lg:h-[90vh]">
        <div className="p-5">
          <Button
            onClick={() => setShowSideNav(!showSideNav)}
            variant="secondary"
            className="md:hidden"
          >
            <Menu />
          </Button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
