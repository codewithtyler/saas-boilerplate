"use client";

import { motion, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
  };
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    margin: "-100px",
    once: false
  });

  return (
    <motion.div
      ref={ref}
      className={`flex w-full ${isEven ? 'justify-end lg:pr-32' : 'justify-start lg:pl-32'} mb-8`}
      animate={{ 
        x: isInView ? 0 : (isEven ? -50 : 50),
        opacity: isInView ? 1 : 0
      }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <div className="relative w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border bg-background p-2 transition-all duration-300 hover:shadow-lg">
          <div className="relative z-10 flex h-full flex-col justify-between rounded-xl p-6">
            <div>
              <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${feature.gradient} p-3`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-bold tracking-tight text-xl">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
          <div className={`absolute inset-0 z-0 bg-gradient-to-r ${feature.gradient} opacity-[0.03]`} />
        </div>

        {/* Timeline dot */}
        <div className={`absolute top-8 ${isEven ? '-left-3 lg:-left-[41px]' : '-right-3 lg:-right-[41px]'} h-6 w-6 rounded-full border-4 border-background bg-gradient-to-r ${feature.gradient}`} />
      </div>
    </motion.div>
  );
}