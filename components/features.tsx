"use client";

import { motion, useInView } from "framer-motion";
import { FeatureCard } from "@/components/features/feature-card";
import { features } from "@/components/features/feature-list";
import { useRef } from "react";

export function Features() {
  const bottomRef = useRef(null);
  const isBottomInView = useInView(bottomRef, { 
    margin: "-100px",
    once: false
  });

  return (
    <section id="features" className="container relative py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Powerful Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to build your SaaS application, nothing you don't.
        </p>
      </div>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-[200px] bottom-16 w-px -translate-x-1/2 bg-border" />

      <div className="relative mx-auto mt-16 max-w-6xl">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      <div ref={bottomRef} className="mx-auto mt-20 flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          animate={{ 
            opacity: isBottomInView ? 1 : 0,
            y: isBottomInView ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
        >
          Ready to get started? <span className="text-primary">→</span>
        </motion.div>
        <motion.div
          animate={{ 
            opacity: isBottomInView ? 1 : 0,
            y: isBottomInView ? 0 : 20
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-2xl font-bold sm:text-3xl"
        >
          Start building your SaaS today
        </motion.div>
      </div>
    </section>
  );
}