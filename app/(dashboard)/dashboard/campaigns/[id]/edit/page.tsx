import { CampaignEditForm } from "@/components/campaigns/campaign-edit-form";

interface Campaign {
  id: number;
  name: string;
  type: string;
  status: string;
  subject: string;
  content: string;
  recipients: number;
  sentDate: string;
}

type CampaignData = {
  [key: string]: Campaign;
};

// Mock data - In a real app, this would come from an API
const campaignData: CampaignData = {
  "1": {
    id: 1,
    name: "Welcome Series",
    type: "workflow",
    status: "Active",
    subject: "Welcome to Our Platform! 👋",
    content: "Dear subscriber, \n\nWelcome to our platform! We're excited to have you on board...",
    recipients: 1250,
    sentDate: "Running"
  },
  "2": {
    id: 2,
    name: "Monthly Newsletter",
    type: "broadcast",
    status: "Scheduled",
    subject: "Your March 2024 Newsletter 📰",
    content: "Hello there! \n\nHere's what's new this month...",
    recipients: 5000,
    sentDate: "Mar 15, 2024"
  },
  "3": {
    id: 3,
    name: "Product Launch",
    type: "broadcast",
    status: "Draft",
    subject: "Introducing Our Latest Feature 🚀",
    content: "Hi {first_name}, \n\nWe're thrilled to announce our newest feature...",
    recipients: 10000,
    sentDate: "Not sent"
  }
};

export function generateStaticParams() {
  return Object.keys(campaignData).map((id) => ({
    id
  }));
}

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const campaign = campaignData[params.id];
  return <CampaignEditForm campaign={campaign} />;
}