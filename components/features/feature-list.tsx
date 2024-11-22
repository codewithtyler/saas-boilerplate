import { Check, Zap, Database, Lock, Palette, Coins } from "lucide-react";

export const features = [
  {
    title: "Authentication Options",
    description: "Choose between Next-Auth or Supabase Auth for user management. Includes social logins, email verification, and password reset flows.",
    icon: Lock,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Database Flexibility",
    description: "MongoDB or Supabase database integration out of the box. Includes schema management, migrations, and type-safe queries.",
    icon: Database,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Payment Processing",
    description: "Stripe or LemonSqueezy for handling payments and subscriptions. Includes webhook handling and customer portal integration.",
    icon: Coins,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Modern UI Components",
    description: "Beautiful, accessible components built with shadcn/ui and Tailwind CSS. Includes dark mode, animations, and responsive designs.",
    icon: Palette,
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Performance Optimized",
    description: "Built with Next.js 14 and React Server Components for optimal performance. Includes image optimization and lazy loading.",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Production Ready",
    description: "Enterprise-grade security, SEO optimization, and email integration. Includes error tracking and performance monitoring.",
    icon: Check,
    gradient: "from-teal-500 to-green-500"
  },
];