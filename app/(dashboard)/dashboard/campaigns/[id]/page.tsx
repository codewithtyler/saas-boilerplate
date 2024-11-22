import { CampaignDetail } from "@/components/campaigns/campaign-detail";
import { campaignData } from "@/lib/campaign-data";

interface Email {
  id: string;
  subject: string;
  waitDays: number;
}

type CampaignData = {
  [key: string]: {
    id: number;
    name: string;
    type: string;
    status: string;
    subject: string;
    content: string;
    recipients: number;
    sentDate: string;
    stats: {
      openRate: string;
      clickRate: string;
    };
    emails?: Array<{
      id: string;
      subject: string;
      waitDays: number;
    }>;
  };
};

export function generateStaticParams() {
  return Object.keys(campaignData).map((id) => ({
    id
  }));
}

export default function CampaignPage({ params }: { params: { id: string } }) {
  const typedCampaignData = campaignData as CampaignData;
  const campaign = typedCampaignData[params.id];
  
  if (!campaign) {
    return null;
  }

  return <CampaignDetail campaign={campaign} />;
}