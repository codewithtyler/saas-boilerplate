"use client";

import { useEffect, useState } from "react";
import { getRecentSales } from "@/lib/db/queries";
import type { Payment } from "@/lib/db/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function RecentSales() {
  const [sales, setSales] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getRecentSales();
        setSales(data);
      } catch (error) {
        setSales([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            <div className="ml-4 space-y-1">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div className="ml-auto h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="flex h-[20vh] items-center justify-center text-muted-foreground">
        No recent sales
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${sale.customers?.first_name} ${sale.customers?.last_name}`} />
            <AvatarFallback>
              {sale.customers?.first_name?.[0]}
              {sale.customers?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.customers?.first_name} {sale.customers?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {sale.customers?.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +${sale.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}