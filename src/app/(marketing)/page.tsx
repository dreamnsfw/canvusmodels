import { Hero } from "@/components/marketing/Hero";
import { ModelCarousel } from "@/components/marketing/ModelCarousel";
import { Showcase } from "@/components/marketing/Showcase";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { Testimonials } from "@/components/marketing/Testimonials";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FAQ } from "@/components/marketing/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModelCarousel />
      <Showcase />
      <ComparisonTable />
      <Testimonials />
      <PricingSection />
      <FAQ />
    </>
  );
}
