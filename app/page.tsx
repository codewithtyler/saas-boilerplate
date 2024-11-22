import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-screen-2xl">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}