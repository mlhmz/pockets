import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { ArrowLeftRight, ChevronUp, LayoutDashboard, User2 } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { useAuth } from "react-oidc-context";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./ui/sidebar";

type Link = {
  icon: ReactNode;
  text: string;
  href: string;
  strict: boolean;
  links?: SubLink[];
};

type SubLink = {
  text: string;
  href: string;
}

export const SideNav = () => {
  const { user, signoutRedirect } = useAuth();
  const location = useLocation();
  const { data } = useQueryPockets();
  console.log(data)
  const links = useMemo(() => [
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
      strict: true,
      links: data?.map((pocket) => ({
        text: pocket.name,
        href: `/app/transactions/${pocket.uuid}`
      }))
    }
  ], [data]);

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
                <>
                  <SidebarMenuItem key={item.text}>
                    <SidebarMenuButton asChild>
                      <Link to={item.href} className={resolveClassNameByHref(item.strict, item.href, location.pathname)}>
                        {item.icon}
                        <span>{item.text}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.links && <SidebarMenuSub>
                      {item.links?.map(link => (
                        <SidebarMenuItem key={link.text}>
                          <SidebarMenuButton asChild>
                            <Link to={link.href} className={resolveClassNameByHref(true, link.href, location.pathname)}>
                              <span>{link.text}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>}

                  </SidebarMenuItem>
                </>
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
