"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plane, MessageSquare, LayoutDashboard, Users, Building2, ClipboardList } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Plane },
  { href: "/search", label: "Packages", icon: Plane },
  { href: "/chat", label: "AI Assistant", icon: MessageSquare },
  { href: "/internal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/internal/crm", label: "CRM", icon: Users },
  { href: "/internal/tasks", label: "Tasks", icon: ClipboardList },
  { href: "/b2b/catalog", label: "B2B Portal", icon: Building2 },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">TourFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              T
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
