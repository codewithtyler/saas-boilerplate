"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Campaign {
  id: number;
  name: string;
  type: string;
  subject: string;
  content: string;
}

interface CampaignEditFormProps {
  campaign: Campaign;
}

export function CampaignEditForm({ campaign }: CampaignEditFormProps) {
  const [formData, setFormData] = useState({
    name: campaign.name,
    subject: campaign.subject,
    content: campaign.content
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Campaign updated successfully!");
  };

  return (
    <div className="flex-1">
      <DashboardHeader campaignName={campaign.name} />
      <DashboardShell>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">Edit Campaign</h2>
              <p className="text-[hsl(var(--md-secondary))]">
                Update your campaign details.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href={`/dashboard/campaigns/${campaign.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaign
              </Link>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Email Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="min-h-[200px]"
                    required
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </div>
  );
}