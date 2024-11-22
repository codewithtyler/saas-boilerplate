import config from '@/config.json';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type AuthProvider = {
  providers: string[];
  emailVerification: boolean;
  passwordReset: boolean;
};

type DatabaseProvider = {
  schemas: string[];
  migrations: boolean;
  typeGeneration: boolean;
};

type PaymentProvider = {
  subscriptions: boolean;
  webhooks: boolean;
  customerPortal: boolean;
  currency: string;
};

type EmailTemplate = {
  welcome: string;
  passwordReset: string;
  emailVerification: string;
};

type EmailProvider = {
  domain?: string;
  apiKey: string;
  templates: EmailTemplate;
};

type ProviderOptions = {
  auth: {
    'next-auth': AuthProvider;
    supabase: AuthProvider;
  };
  database: {
    mongodb: DatabaseProvider;
    supabase: DatabaseProvider;
  };
  payment: {
    stripe: PaymentProvider;
    lemonsqueezy: PaymentProvider;
  };
  email: {
    mailgun: EmailProvider & { domain: string };
    sendgrid: EmailProvider;
    resend: EmailProvider;
  };
};

export type Provider = {
  selected: string;
  accountSignUpEnabled?: boolean;
  options: Record<string, any>;
};

export type Config = {
  app: {
    name: string;
    description: string;
    url: string;
    logo: string;
    isProduction: boolean;
  };
  providers: {
    auth: Provider;
    database: Provider;
    payment: Provider;
    email: Provider;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    twitter: {
      handle: string;
      cardType: "summary" | "summary_large_image" | "app" | "player";
    };
  };
  pricing: {
    method: "payment" | "subscription";
    currency: string;
    labels: {
      paymentLabel: string;
      subscriptionLabel: string;
    };
    allFeatures: string[];
    plans: Array<{
      name: string;
      price: number;
      annualPrice?: number;
      isPopular?: boolean;
      features: string[];
    }>;
  };
};

export const getConfig = (): Config => {
  return config as Config;
};

export function getSelectedProvider<T extends keyof ProviderOptions>(type: keyof Config['providers']) {
  const provider = config.providers[type];
  const options = provider.options as ProviderOptions[T];
  return {
    name: provider.selected,
    config: options[provider.selected as keyof typeof options]
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}