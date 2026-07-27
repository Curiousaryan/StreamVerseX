import LandingNavbar from "../../components/landing/LandingNavbar";
import HeroSection from "../../components/landing/HeroSection";
import TrendingPreview from "../../components/landing/TrendingPreview";
import EntertainmentShowcase from "../../components/landing/EntertainmentShowcase";
import AIDiscoverySection from "../../components/landing/AIDiscoverySection";
import PersonalHubSection from "../../components/landing/PersonalHubSection";
import PremiumSection from "../../components/landing/PremiumSection,";
import FinalCTASection from "../../components/landing/FinalCTASection";
import LandingFooter from "../../components/landing/LandingFooter";

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <LandingNavbar />

      <main>
        <HeroSection />

        <TrendingPreview />

        <EntertainmentShowcase />

        <AIDiscoverySection />

        <PersonalHubSection/>

        <PremiumSection/>

        <FinalCTASection/>

        <LandingFooter/>
      </main>
    </div>
  );
}

export default Landing;