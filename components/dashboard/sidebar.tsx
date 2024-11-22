"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail
} from "lucide-react";
import { getConfig } from "@/lib/config";

const config = getConfig();

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package
  },
  {
    title: "Email Campaigns",
    href: "/dashboard/campaigns",
    icon: Mail
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "dashboard-sidebar flex flex-col transition-all duration-300 relative group",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-center px-4">
        {!collapsed && (
          <span className="font-medium text-[hsl(var(--md-secondary))]">
            {config.app.name}
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm transition-colors w-full",
                isActive 
                  ? "bg-[hsl(var(--md-primary-container))] text-[hsl(var(--md-on-primary-container))]" 
                  : "text-[hsl(var(--md-secondary))] hover:bg-[hsl(var(--md-surface-3))]",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[hsl(var(--md-surface-2))] hover:bg-[hsl(var(--md-surface-3))] border border-[hsl(var(--md-outline))]",
          "flex items-center justify-center p-0 text-[hsl(var(--md-secondary))]",
          "transition-transform duration-300"
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="p-4">
          <div className="rounded-lg bg-[hsl(var(--md-surface-2))] p-4">
            <div className="mb-2 flex items-center gap-2 text-[hsl(var(--md-primary))]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Pro Plan</span>
            </div>
            <p className="mb-3 text-xs text-[hsl(var(--md-secondary))]">
              Upgrade to access all features and get priority support.
            </p>
            <Button 
              className="material-button w-full text-xs"
              size="sm"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}