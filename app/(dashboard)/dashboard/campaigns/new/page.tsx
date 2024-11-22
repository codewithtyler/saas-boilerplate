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

interface WorkflowEmail {
  id: string;
  subject: string;
  content: string;
  waitDays: number;
}

interface WorkflowData {
  emails: WorkflowEmail[];
}

interface BroadcastData {
  subject: string;
  content: string;
}

export default function NewCampaignPage() {
  const [campaignType, setCampaignType] = useState<"broadcast" | "workflow">("broadcast");
  const [broadcastData, setBroadcastData] = useState<BroadcastData>({
    subject: "",
    content: ""
  });
  const [workflowData, setWorkflowData] = useState<WorkflowData>({
    emails: [{ id: "1", subject: "", content: "", waitDays: 0 }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Campaign created successfully!");
  };

  const addWorkflowEmail = () => {
    setWorkflowData(prev => ({
      emails: [
        ...prev.emails,
        {
          id: (prev.emails.length + 1).toString(),
          subject: "",
          content: "",
          waitDays: 1
        }
      ]
    }));
  };

  const removeWorkflowEmail = (index: number) => {
    if (workflowData.emails.length > 1) {
      setWorkflowData(prev => ({
        emails: prev.emails.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="flex-1">
      <DashboardHeader />
      <DashboardShell>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">New Campaign</h2>
              <p className="text-[hsl(var(--md-secondary))]">
                Create a new email campaign.
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/campaigns">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaigns
              </Link>
            </Button>
          </div>

          <Card className="p-6">
            <div className="mb-6">
              <Label>Campaign Type</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  variant={campaignType === "broadcast" ? "default" : "outline"}
                  onClick={() => setCampaignType("broadcast")}
                >
                  Single Email
                </Button>
                <Button
                  variant={campaignType === "workflow" ? "default" : "outline"}
                  onClick={() => setCampaignType("workflow")}
                >
                  Email Sequence
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {campaignType === "broadcast" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      value={broadcastData.subject}
                      onChange={(e) => setBroadcastData(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea
                      id="content"
                      value={broadcastData.content}
                      onChange={(e) => setBroadcastData(prev => ({ ...prev, content: e.target.value }))}
                      className="min-h-[200px]"
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  {workflowData.emails.map((email, index) => (
                    <Card key={email.id} className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Email {index + 1}</h3>
                        {workflowData.emails.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeWorkflowEmail(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Email Subject</Label>
                          <Input
                            value={email.subject}
                            onChange={(e) => {
                              const newEmails = [...workflowData.emails];
                              newEmails[index].subject = e.target.value;
                              setWorkflowData({ ...workflowData, emails: newEmails });
                            }}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Email Content</Label>
                          <Textarea
                            value={email.content}
                            onChange={(e) => {
                              const newEmails = [...workflowData.emails];
                              newEmails[index].content = e.target.value;
                              setWorkflowData({ ...workflowData, emails: newEmails });
                            }}
                            className="min-h-[200px]"
                            required
                          />
                        </div>

                        {index > 0 && (
                          <div className="space-y-2">
                            <Label>Wait Days</Label>
                            <Input
                              type="number"
                              min="1"
                              className="w-20"
                              value={email.waitDays}
                              onChange={(e) => {
                                const newEmails = [...workflowData.emails];
                                newEmails[index].waitDays = parseInt(e.target.value) || 0;
                                setWorkflowData({ ...workflowData, emails: newEmails });
                              }}
                              required
                            />
                            <span className="text-sm text-muted-foreground ml-2">
                              days after previous email
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addWorkflowEmail}
                    className="w-full"
                  >
                    Add Another Email
                  </Button>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button type="submit">Create Campaign</Button>
              </div>
            </form>
          </Card>
        </div>
      </DashboardShell>
    </div>
  );
}