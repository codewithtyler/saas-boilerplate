"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PricingOptionsProps {
  selectedMethod: string;
  onMethodChange: (value: string) => void;
}

export function PricingOptions({
  selectedMethod,
  onMethodChange,
}: PricingOptionsProps) {
  return (
    <div className="flex justify-center">
      <Select value={selectedMethod} onValueChange={onMethodChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select payment type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="payment">One-time payment</SelectItem>
          <SelectItem value="subscription">Subscription</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}