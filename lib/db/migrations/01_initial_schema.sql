-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create features table
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  product_id UUID REFERENCES products(id),
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create campaign_subscribers table
CREATE TABLE campaign_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id),
  subscriber_id UUID REFERENCES subscribers(id),
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create email_events table
CREATE TABLE email_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id),
  subscriber_id UUID REFERENCES subscribers(id),
  event_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create usage_logs table
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  feature TEXT NOT NULL,
  usage_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at
  BEFORE UPDATE ON features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_subscribers_updated_at
  BEFORE UPDATE ON campaign_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Customers: Users can only view and modify their own data
CREATE POLICY "Users can view own customer data" ON customers
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own customer data" ON customers
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own customer data" ON customers
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Products: All authenticated users can view active products, only admins can modify
CREATE POLICY "Users can view active products" ON products
  FOR SELECT USING (active = true);
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can update products" ON products
  FOR UPDATE USING (auth.jwt() ? 'is_admin') WITH CHECK (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can delete products" ON products
  FOR DELETE USING (auth.jwt() ? 'is_admin');

-- Features: All authenticated users can view features, only admins can modify
CREATE POLICY "Users can view features" ON features
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert features" ON features
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can update features" ON features
  FOR UPDATE USING (auth.jwt() ? 'is_admin') WITH CHECK (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can delete features" ON features
  FOR DELETE USING (auth.jwt() ? 'is_admin');

-- Subscriptions: Users can view their own subscriptions, only system can modify
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "System can insert subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can update subscriptions" ON subscriptions
  FOR UPDATE USING (auth.jwt() ? 'is_service_role') WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can delete subscriptions" ON subscriptions
  FOR DELETE USING (auth.jwt() ? 'is_service_role');

-- Payments: Users can view their own payments, only system can modify
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "System can insert payments" ON payments
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can update payments" ON payments
  FOR UPDATE USING (auth.jwt() ? 'is_service_role') WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can delete payments" ON payments
  FOR DELETE USING (auth.jwt() ? 'is_service_role');

-- Campaigns: Only admins can manage campaigns
CREATE POLICY "Admins can view campaigns" ON campaigns
  FOR SELECT USING (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can insert campaigns" ON campaigns
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can update campaigns" ON campaigns
  FOR UPDATE USING (auth.jwt() ? 'is_admin') WITH CHECK (auth.jwt() ? 'is_admin');
CREATE POLICY "Admins can delete campaigns" ON campaigns
  FOR DELETE USING (auth.jwt() ? 'is_admin');

-- Subscribers: Users can view their own subscriber data, only system can modify
CREATE POLICY "Users can view own subscriber data" ON subscribers
  FOR SELECT USING (email = auth.jwt() ->> 'email');
CREATE POLICY "System can insert subscribers" ON subscribers
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can update subscribers" ON subscribers
  FOR UPDATE USING (auth.jwt() ? 'is_service_role') WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can delete subscribers" ON subscribers
  FOR DELETE USING (auth.jwt() ? 'is_service_role');

-- Campaign Subscribers: Only system can access campaign subscribers
CREATE POLICY "System can view campaign subscribers" ON campaign_subscribers
  FOR SELECT USING (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can insert campaign subscribers" ON campaign_subscribers
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can update campaign subscribers" ON campaign_subscribers
  FOR UPDATE USING (auth.jwt() ? 'is_service_role') WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can delete campaign subscribers" ON campaign_subscribers
  FOR DELETE USING (auth.jwt() ? 'is_service_role');

-- Email Events: Only system can manage email events
CREATE POLICY "System can view email events" ON email_events
  FOR SELECT USING (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can insert email events" ON email_events
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can update email events" ON email_events
  FOR UPDATE USING (auth.jwt() ? 'is_service_role') WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can delete email events" ON email_events
  FOR DELETE USING (auth.jwt() ? 'is_service_role');

-- Usage Logs: Users can view their own usage logs, only system can create
CREATE POLICY "Users can view own usage logs" ON usage_logs
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "System can insert usage logs" ON usage_logs
  FOR INSERT WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can update usage logs" ON usage_logs
  FOR UPDATE USING (auth.jwt() ? 'is_service_role') WITH CHECK (auth.jwt() ? 'is_service_role');
CREATE POLICY "System can delete usage logs" ON usage_logs
  FOR DELETE USING (auth.jwt() ? 'is_service_role');