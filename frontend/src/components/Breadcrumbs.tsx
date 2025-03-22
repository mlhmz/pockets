import { ChevronRight, LayoutDashboard } from "lucide-react";
import React, { useMemo } from "react";
import { Link, Location } from "react-router-dom";
import { PocketBreadcrumb } from "./PocketBreadcrumb";

interface RouteMapping {
  section: string;
  content: (value?: string) => React.ReactNode;
}

interface Routes {
  link: string;
  mapping: RouteMapping[];
}

export const routes: Routes[] = [
  {
    link: "/app",
    mapping: [
      {
        section: "app",
        content: () => <p><LayoutDashboard size={16} /></p>,
      },
    ],
  },
  {
    link: "/app/transactions",
    mapping: [
      {
        section: "app",
        content: () => <Link to="/app" className="text-sm text-muted-foreground hover:text-black transition-all"><LayoutDashboard size={16} /></Link>,
      },
      {
        section: "transactions",
        content: () => <Link to="/app/transactions" className="text-sm">Transactions</Link>,
      },
    ],
  },
  {
    link: "/app/transactions/:uuid",
    mapping: [
      {
        section: "app",
        content: () => <Link to="/app" className="text-sm text-muted-foreground hover:text-black transition-all"><LayoutDashboard size={16} /></Link>,
      },
      {
        section: "transactions",
        content: () => <Link to="/app/transactions" className="text-sm text-muted-foreground hover:text-black transition-all">Transactions </Link>,
      },
      {
        section: "uuid",
        content: (uuid) => <PocketBreadcrumb uuid={uuid} />,
      }
    ],
  }
];

interface Breadcrumb {
  id: string;
  element: React.ReactNode;
}

export const Breadcrumbs = ({location}: {location: Location}) => {
  const breadcrumbs = useMemo(() => {
    // Regular expression to match UUIDs
    const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    // Replace UUIDs in the pathname with a placeholder
    const normalizedPathname = location.pathname.replace(uuidRegex, ":uuid");

    // Match the current location to the routes
    const currentRoute = routes.find(route => route.link === normalizedPathname);
    if (!currentRoute) {
      return [];
    }

    // Extract the UUID from the pathname
    const uuidMatch = location.pathname.match(uuidRegex);
    const uuid = uuidMatch ? uuidMatch[0] : undefined;

    return currentRoute.mapping.map(mapping => {
      return {
        id: mapping.section,
        element: mapping.content(uuid),
      } as Breadcrumb;
    });
  }, [location.pathname]);

  return (
    <div className="flex items-center gap-2 border-l pl-3">
      {breadcrumbs.map((breadcrumb, index) => (<div className="flex items-center gap-3" key={index}>
        <div key={index}>{breadcrumb.element}</div>
        {index !== breadcrumbs.length - 1 && <p className="text-muted-foreground"><ChevronRight size={16} /></p>}
      </div>
      ))}
    </div>
  );
}