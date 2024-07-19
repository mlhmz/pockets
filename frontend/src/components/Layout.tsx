import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import { Button } from "./ui/button";

export const Layout = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div className="flex">
      <SideNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
      <div className="flex-grow overflow-y-auto h-screen">
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
