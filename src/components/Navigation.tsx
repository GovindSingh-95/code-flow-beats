
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const location = useLocation();
  
  const links = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/friends", icon: Users, label: "Friends" },
    { to: "/library", icon: Library, label: "Library" },
    { to: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 glass border-t border-border/50 z-50">
      <div className="flex items-center justify-around h-16">
        {links.map(link => (
          <Link 
            key={link.to} 
            to={link.to}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-md",
              location.pathname === link.to ? "text-primary" : "text-muted-foreground"
            )}
          >
            <link.icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
