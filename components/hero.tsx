"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/lib/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const config = getConfig();

export function Hero() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.firstName && formData.lastName) {
      // In a real app, this would submit to an API
      toast.success("Thanks for joining the waitlist!");
      setFormData({ firstName: "", lastName: "", email: "" });
    }
  };

  if (config.app.isProduction) {
    return (
      <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-16 md:pb-12 md:pt-24 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <Button
            className="rounded-full"
            size="sm"
            variant="outline"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Launch your SaaS faster
          </Button>
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            {config.app.name}
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            {config.app.description}
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <a href="#pricing">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-16 md:pb-12 md:pt-24 lg:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <Button
          className="rounded-full"
          size="sm"
          variant="outline"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Coming Soon
        </Button>
        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          {config.app.name}
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          {config.app.description}
        </p>
      </div>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join the Waitlist</DialogTitle>
              <DialogDescription>
                Be the first to know when we launch. We'll notify you as soon as {config.app.name} is ready.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleWaitlist} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Join Waitlist</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}