"use client";

import { useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await isAuthenticated();
      if (isLoggedIn) {
        window.location.href = "/dashboard";
      } else {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = "/dashboard";
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid">
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Logging in...</p>
        </div>
      </Card>
    </div>
  );
}