
import CtaSection from "@/components/home/CtaSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/home/PricingSection";
import StatsSection from "@/components/home/StatsSection";


export default function HomePage() {
  return (
    <main className="min-h-screen ">
      <HeroSection />
      <StatsSection />
      <FeaturedJobs />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
    </main>
  )
}
