import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="flex flex-col h-screen items-center justify-center">
    <h1 className="text-5xl">404</h1>
    <p>The page you requested was not found.</p>
    <Link
      className="flex gap-2 text-muted-foreground items-center justify-center"
      to="/"
    >
      <ArrowLeft />
      <a>Return to dashboard</a>
    </Link>
  </div>
);
