import LandingBenefits from "./landing-benefits";
import LandingCTA from "./landing-cta";
import LandingFeatures from "./landing-features";
import LandingFooter from "./landing-footer";
import LandingHeader from "./landing-header";
import LandingHero from "./landing-hero";
import LandingModules from "./landing-modules";
import LandingStats from "./landing-stats";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingModules />
      <LandingBenefits />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
