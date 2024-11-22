"use client";

import { Button } from "@/components/ui/button";

interface PricingToggleProps {
  billingInterval: "monthly" | "annual";
  onIntervalChange: (interval: "monthly" | "annual") => void;
}

export function PricingToggle({ billingInterval, onIntervalChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant={billingInterval === "monthly" ? "default" : "outline"}
        onClick={() => onIntervalChange("monthly")}
        className="relative"
      >
        Monthly
      </Button>
      <Button
        variant={billingInterval === "annual" ? "default" : "outline"}
        onClick={() => onIntervalChange("annual")}
        className="relative"
      >
        Annual
        <span className="absolute -right-2 -top-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          Save 20%
        </span>
      </Button>
    </div>
  );
}