import {
  Car,
  CircleSlash,
  Heater,
  LayoutDashboard,
  ShieldCheck,
  TreePalm,
  Tv,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export const Layout = () => {
  return (
    <div className="flex">
      <div>
        <div className="flex flex-shrink flex-col gap-3 p-5">
          <h1 className="font-bold">Savings</h1>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <LayoutDashboard />
            <p>Dashboard</p>
          </Button>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <TreePalm />
            <p>Vacation</p>
          </Button>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <ShieldCheck />
            <p>Liability</p>
          </Button>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <Heater />
            <p>Gas</p>
          </Button>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <Car />
            <p>Car Insurance</p>
          </Button>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <Tv />
            <p>Public Broadcast</p>
          </Button>
          <Button
            variant={"ghost"}
            className="flex justify-start gap-1 font-bold"
          >
            <CircleSlash />
            <p>No Category</p>
          </Button>
        </div>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};
