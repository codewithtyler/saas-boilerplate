export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  type: 'broadcast' | 'workflow';
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  recipients?: number;
  stats?: {
    openRate: string;
    clickRate: string;
  };
  emails?: Array<{
    id: string;
    subject: string;
    content: string;
    waitDays: number;
  }>;
}

export interface Payment {
  id: string;
  customer_id: string;
  subscription_id?: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  customers?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface Subscription {
  id: string;
  customer_id: string;
  product_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLog {
  id: string;
  customer_id: string;
  feature: string;
  usage_count: number;
  created_at: string;
}

export interface EmailEvent {
  id: string;
  campaign_id: string;
  subscriber_id: string;
  event_type: 'send' | 'open' | 'click';
  created_at: string;
}