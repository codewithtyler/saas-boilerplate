"use client";

import { UserNav } from "@/components/dashboard/user-nav";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function getBreadcrumbItems(path: string, campaignName?: string) {
  const parts = path.split('/').filter(Boolean);
  const items = [{ label: "Dashboard", href: "/dashboard" }];

  if (parts.includes("campaigns")) {
    items.push({ label: "Email Campaigns", href: "/dashboard/campaigns" });

    if (parts.includes("new")) {
      items.push({ label: "New", href: "/dashboard/campaigns/new" });
    } else if (campaignName) {
      items.push({ label: campaignName, href: `#` });
      if (parts.includes("edit")) {
        items.push({ label: "Edit", href: "#" });
      }
    }
  }

  return items;
}

interface DashboardHeaderProps {
  campaignName?: string;
}

export function DashboardHeader({ campaignName }: DashboardHeaderProps) {
  const pathname = usePathname();
  const breadcrumbItems = getBreadcrumbItems(pathname, campaignName);

  return (
    <div className="dashboard-header">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 text-[hsl(var(--md-secondary))]">
          {breadcrumbItems.map((item, index) => (
            <div key={item.label} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-sm text-foreground">{item.label}</span>
              ) : (
                <Button variant="link" asChild className="p-0 h-auto text-sm text-[hsl(var(--md-secondary))] hover:text-foreground">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
        <UserNav />
      </div>
    </div>
  );
}