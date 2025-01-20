import { ArrowLeftRight, ChevronUp, LayoutDashboard, User2 } from "lucide-react";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link, redirect } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
  const { user, signoutRedirect } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Savings Categorization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.text}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href}>
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.profile.preferred_username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => {
                  signoutRedirect();
                }}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
