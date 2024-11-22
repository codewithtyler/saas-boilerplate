"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Mail, Workflow } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const campaigns = [
  {
    id: 1,
    name: "Welcome Series",
    type: "workflow",
    status: "Active",
    recipients: 1250,
    emailCount: 4,
    lastActivity: "2 mins ago"
  },
  {
    id: 2,
    name: "Monthly Newsletter",
    type: "broadcast",
    status: "Scheduled",
    recipients: 5000,
    scheduledFor: "Mar 15, 2024",
    openRate: "-"
  },
  {
    id: 3,
    name: "Product Launch",
    type: "broadcast",
    status: "Draft",
    recipients: 10000,
    scheduledFor: "Not scheduled",
    openRate: "-"
  },
  {
    id: 4,
    name: "Customer Onboarding",
    type: "workflow",
    status: "Active",
    recipients: 850,
    emailCount: 6,
    lastActivity: "5 mins ago"
  },
  {
    id: 5,
    name: "Trial User Engagement",
    type: "workflow",
    status: "Active",
    recipients: 2100,
    emailCount: 5,
    lastActivity: "12 mins ago"
  }
];

export default function CampaignsPage() {
  const activeWorkflows = campaigns.filter(c => c.type === "workflow" && c.status === "Active").length;
  const scheduledBroadcasts = campaigns.filter(c => c.type === "broadcast" && c.status === "Scheduled").length;

  return (
    <div className="flex-1">
      <DashboardHeader />
      <DashboardShell>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">Email Campaigns</h2>
              <p className="text-[hsl(var(--md-secondary))]">
                Create and manage your email marketing campaigns.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/campaigns/new">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Active Workflows</span>
                <span className="text-2xl font-bold">{activeWorkflows}</span>
                <span className="text-sm text-muted-foreground">campaigns running</span>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Scheduled Broadcasts</span>
                <span className="text-2xl font-bold">{scheduledBroadcasts}</span>
                <span className="text-sm text-muted-foreground">campaigns queued</span>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`}>
                <Card className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">
                          {campaign.type === "workflow" ? (
                            <div className="flex items-center gap-1">
                              <Workflow className="h-3 w-3" />
                              <span>Workflow</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>Broadcast</span>
                            </div>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {campaign.type === "workflow" ? (
                          <>
                            {campaign.emailCount} emails in sequence • {campaign.recipients} recipients • Last activity {campaign.lastActivity}
                          </>
                        ) : (
                          <>
                            {campaign.recipients} recipients • {campaign.scheduledFor} • Open rate: {campaign.openRate}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}