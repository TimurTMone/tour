"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/LangContext";
import { Plane, MessageSquare, LayoutDashboard, Users, Building2, ClipboardList, Globe } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLang();

  const navItems = [
    { href: "/", label: t.nav.home, icon: Plane },
    { href: "/search", label: t.nav.packages, icon: Plane },
    { href: "/chat", label: t.nav.aiAssistant, icon: MessageSquare },
    { href: "/internal/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/internal/crm", label: t.nav.crm, icon: Users },
    { href: "/internal/tasks", label: t.nav.tasks, icon: ClipboardList },
    { href: "/b2b/catalog", label: t.nav.b2bPortal, icon: Building2 },
  ];

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
            <button
              onClick={() => setLocale(locale === "en" ? "ru" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              {locale === "en" ? "RU" : "EN"}
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              T
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
