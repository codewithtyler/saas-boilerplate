"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, Package, Activity, DollarSign } from "lucide-react";
import { getRevenue, getActiveSubscriptions, getTotalSales, getActiveUsers } from "@/lib/db/queries";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    subscriptions: 0,
    sales: 0,
    activeUsers: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [revenue, subscriptions, sales, activeUsers] = await Promise.all([
          getRevenue(),
          getActiveSubscriptions(),
          getTotalSales(),
          getActiveUsers()
        ]);

        setStats({
          revenue,
          subscriptions,
          sales,
          activeUsers,
          loading: false
        });
      } catch (error) {
        setStats(prev => ({ 
          revenue: 0,
          subscriptions: 0,
          sales: 0,
          activeUsers: 0,
          loading: false 
        }));
      }
    };

    fetchStats();
  }, []);

  const stats_data = [
    {
      title: "Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      change: "+0%",
      icon: DollarSign
    },
    {
      title: "Subscriptions",
      value: stats.subscriptions.toString(),
      change: "+0%",
      icon: Users
    },
    {
      title: "Sales",
      value: stats.sales.toString(),
      change: "+0%",
      icon: Package
    },
    {
      title: "Active Now",
      value: stats.activeUsers.toString(),
      change: "+0",
      icon: Activity
    }
  ];

  return (
    <div className="flex-1">
      <DashboardHeader />
      <DashboardShell>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Welcome back</h2>
            <p className="text-[hsl(var(--md-secondary))]">
              Here's what's happening with your business today.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats_data.map((stat, i) => (
              <Card key={i} className="material-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-[hsl(var(--md-secondary))]">
                    {stat.title}
                  </CardTitle>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(var(--md-primary-container))]">
                    <stat.icon className="h-5 w-5 text-[hsl(var(--md-on-primary-container))]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    {stats.loading ? (
                      <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                    ) : (
                      <div className="text-2xl font-medium">
                        {stat.value}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-[hsl(var(--md-primary))]" />
                      <span className="text-[hsl(var(--md-primary))] font-medium">{stat.change}</span>
                      <span className="text-[hsl(var(--md-secondary))]">vs last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-7">
            <Card className="material-card md:col-span-4">
              <CardHeader>
                <CardTitle className="font-medium">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
            </Card>

            <Card className="material-card md:col-span-3">
              <CardHeader>
                <CardTitle className="font-medium">Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}