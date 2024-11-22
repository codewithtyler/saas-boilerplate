"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Pencil, Mail, Users, Clock, BarChart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { WorkflowSequence } from "@/components/campaigns/workflow-sequence";
import { useState } from "react";

interface Email {
  id: string;
  subject: string;
  waitDays: number;
}

interface CampaignDetailProps {
  campaign: {
    id: number;
    name: string;
    type: string;
    status: string;
    subject?: string;
    content?: string;
    recipients: number;
    sentDate: string;
    stats: {
      openRate: string;
      clickRate: string;
    };
    emails?: Email[];
  };
}

export function CampaignDetail({ campaign }: CampaignDetailProps) {
  const [emails, setEmails] = useState<Email[]>(
    campaign.emails?.map((email, index) => ({
      ...email,
      id: index.toString()
    })) || []
  );

  return (
    <div className="flex-1">
      <DashboardHeader campaignName={campaign.name} />
      <DashboardShell>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-medium">{campaign.name}</h2>
                <Badge variant="outline">
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {campaign.type === "workflow" ? "Workflow Campaign" : "Broadcast Campaign"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/dashboard/campaigns">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Campaigns
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Campaign
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Open Rate</p>
                  <p className="text-2xl font-bold">{campaign.stats.openRate}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Recipients</p>
                  <p className="text-2xl font-bold">{campaign.recipients}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-2xl font-bold">{campaign.sentDate}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Click Rate</p>
                  <p className="text-2xl font-bold">{campaign.stats.clickRate}</p>
                </div>
              </div>
            </Card>
          </div>

          {campaign.type === "workflow" && emails.length > 0 ? (
            <WorkflowSequence 
              campaignId={campaign.id}
              emails={emails}
              onReorder={setEmails}
            />
          ) : campaign.type === "broadcast" && (
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Email Content</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Subject</p>
                  <p className="text-muted-foreground">{campaign.subject}</p>
                </div>
                <div>
                  <p className="font-medium">Content</p>
                  <p className="text-muted-foreground whitespace-pre-wrap">{campaign.content}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </DashboardShell>
    </div>
  );
}