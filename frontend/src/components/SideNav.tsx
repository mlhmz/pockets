import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  EuroIcon,
  LayoutDashboard,
  Wallet,
  X,
} from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
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
    icon: <ArrowLeftRight />,
    text: "Transactions",
    href: "/transactions",
  },
  {
    icon: <EuroIcon />,
    text: "Pockets",
    href: "/pockets",
  },
];

export const SideNav = ({
  showSideNav,
  setShowSideNav,
}: {
  showSideNav: boolean;
  setShowSideNav: (value: boolean) => void;
}) => {
  return (
    <div>
      <div
        className={cn(
          "fixed bg-white min-w-[220px] md:static flex flex-shrink flex-col gap-3 p-5 h-screen z-10 border-r border-r-border shadow transition-all ease-in-out duration-300",
          showSideNav ? "left-0" : "left-[-50%]"
        )}
      >
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setShowSideNav(!showSideNav)}
            variant="secondary"
            className="md:hidden"
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-5">
          <Wallet size={52} />
          <h1 className="font-bold text-xl">Savings</h1>
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
  );
};
