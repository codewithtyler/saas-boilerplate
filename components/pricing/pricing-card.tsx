"use client";

import { Check, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getConfig } from "@/lib/config";

const config = getConfig();

interface PricingCardProps {
  plan: {
    name: string;
    price: number;
    annualPrice?: number;
    isPopular?: boolean;
    features: string[];
  };
  isAnnual: boolean;
  method: string;
  labels: {
    paymentLabel: string;
    subscriptionLabel: string;
  };
}

export function PricingCard({ plan, isAnnual, method, labels }: PricingCardProps) {
  const price = isAnnual && plan.annualPrice ? plan.annualPrice : plan.price;
  const label = method === "payment" 
    ? labels.paymentLabel 
    : isAnnual ? "year" : labels.subscriptionLabel;
  
  // Calculate savings percentage
  const savingsPercentage = plan.annualPrice 
    ? Math.round((1 - (plan.annualPrice / (plan.price * 12))) * 100)
    : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          {plan.isPopular && (
            <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <Star className="mr-2 h-4 w-4" />
              Most Popular
            </div>
          )}
        </div>
        <div className="mt-2">
          <div className="flex items-baseline text-3xl font-bold">
            ${price}
            {method !== "payment" && (
              <span className="ml-1 text-base font-normal text-muted-foreground">
                /{label}
              </span>
            )}
          </div>
          <div className="h-4">
            {isAnnual && savingsPercentage > 0 ? (
              <div className="text-sm text-blue-500">
                Save {savingsPercentage}% annually
              </div>
            ) : (
              <div className="text-sm text-transparent select-none">
                Placeholder
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <ul className="space-y-2">
          {config.pricing.allFeatures.map((feature) => {
            const hasFeature = plan.features.includes(feature);
            return (
              <li key={feature} className="flex items-center gap-2">
                {hasFeature ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={!hasFeature ? "text-muted-foreground" : ""}>
                  {feature}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!config.app.isProduction}>
          {config.app.isProduction ? "Get Started" : "Coming Soon"}
        </Button>
      </CardFooter>
    </Card>
  );
}