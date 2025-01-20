import { ArrowLeftRight, ChevronUp, LayoutDashboard, User2 } from "lucide-react";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link, redirect, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Link = {
  icon: ReactNode;
  text: string;
  href: string;
  strict: boolean;
};

const links: Link[] = [
  {
    icon: <LayoutDashboard />,
    text: "Dashboard",
    href: "/app",
    strict: true
  },
  {
    icon: <ArrowLeftRight />,
    text: "Transactions",
    href: "/app/transactions",
    strict: false
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
  const location = useLocation();

  const resolveClassNameByHref = (strict: boolean, href: string, pathname: string) => {
    if (strict) {
      return pathname === href ? "text-primary" : "";
    } else {
      return pathname.startsWith(href) ? "text-primary" : "";
    }
  }

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
                    <Link to={item.href} className={resolveClassNameByHref(item.strict, item.href, location.pathname)}>
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
