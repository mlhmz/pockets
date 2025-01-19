import { cn } from "@/lib/utils";
import { ArrowLeftRight, ChevronDown, LayoutDashboard, User, Wallet, X } from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "react-oidc-context";

type Link = {
  icon: ReactNode;
  text: string;
  href: string;
};

const links: Link[] = [
  {
    icon: <LayoutDashboard />,
    text: "Dashboard",
    href: "/app",
  },
  {
    icon: <ArrowLeftRight />,
    text: "Transactions",
    href: "/app/transactions",
  },
];

export const SideNav = ({
  showSideNav,
  setShowSideNav,
}: {
  showSideNav: boolean;
  setShowSideNav: (value: boolean) => void;
}) => {
  const { user } = useAuth();

  return (
    <div>
      <div
        className={cn(
          "fixed bg-accent text-secondary-foreground min-w-[220px] md:static flex flex-shrink flex-col gap-3 p-5 h-screen z-10 border-r border-r-border shadow-sm transition-all ease-in-out duration-300",
          showSideNav ? "left-0" : "left-[-80%]"
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
        <div className="flex flex-col items-center justify-center font-bold w-full py-5">
          <Wallet size={52} className="text-secondary-foreground" />
          <h1 className="text-xl">Savings</h1>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            {links.map((link) => (
              <NavLink
                className={({ isActive }) => cn(isActive ? "text-primary" : "")}
                to={link.href}
              >
                <Button
                  className="flex justify-start items-center gap-1 w-full hover:text-primary"
                  variant={"ghost"}
                >
                  {link.icon}
                  <p>{link.text}</p>
                </Button>
              </NavLink>
            ))}
          </div>
          <Button variant={"outline"} className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <User />
              <p>{user?.profile.preferred_username}</p>
            </div>
            <ChevronDown />
          </Button>
        </div>
      </div>
    </div>
  );
};
