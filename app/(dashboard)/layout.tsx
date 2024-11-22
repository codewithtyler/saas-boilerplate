"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authed = await isAuthenticated();
        setIsAuthed(authed);
        
        if (!authed) {
          localStorage.removeItem('isAuthenticated');
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem('isAuthenticated');
        window.location.href = "/";
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  if (isLoading || !isAuthed) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {children}
    </div>
  );
}