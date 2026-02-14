import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import SecuritySection from '@/components/sections/SecuritySection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <PricingSection />
      <div id="security">
        <SecuritySection />
      </div>
      <CTASection />
    </main>
  );
}
