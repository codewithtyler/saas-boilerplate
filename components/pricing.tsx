"use client";

import { PricingCard } from "@/components/pricing/pricing-card";
import { getConfig } from "@/lib/config";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const config = getConfig();

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-2">
          Choose the plan that's right for you
        </p>
      </div>

      {config.pricing.method === "subscription" && (
        <div className="mx-auto mt-4 flex max-w-[58rem] items-center justify-center gap-4">
          <div className="inline-flex rounded-lg border p-1">
            <Button
              variant={isAnnual ? "ghost" : "default"}
              size="sm"
              onClick={() => setIsAnnual(false)}
              className="relative px-6"
            >
              Monthly
            </Button>
            <Button
              variant={isAnnual ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsAnnual(true)}
              className="relative px-6"
            >
              Annual
            </Button>
          </div>
        </div>
      )}

      <div className="mx-auto mt-8 max-w-[49rem] grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {config.pricing.plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isAnnual={isAnnual}
            method={config.pricing.method}
            labels={config.pricing.labels}
          />
        ))}
      </div>
    </section>
  );
}