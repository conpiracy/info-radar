import { Button } from "@/components/ui/button";
import { BarChart2, BookOpen, Layout, Search } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { icon: Layout, label: "Dashboard", path: "/" },
  { icon: Search, label: "Niche Analysis", path: "/niche-analysis" },
  { icon: BookOpen, label: "Training", path: "/training" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Info Radar
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}