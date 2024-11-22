"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/lib/config";
import { login } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";

const config = getConfig();

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      await login();
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">
              {config.app.name}
            </span>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <Link
              href="#features"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="default" 
            className="hidden md:inline-flex"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <button
            className="flex md:hidden rounded-md hover:bg-accent p-2 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
          <div className="fixed inset-x-4 top-8 z-50 origin-top rounded-xl bg-card border shadow-lg">
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-md hover:bg-accent p-2 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col p-6">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <div className="h-px bg-border my-1" />
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <div className="mt-6 pt-6 border-t">
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => {
                      handleLogin();
                      setIsOpen(false);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}