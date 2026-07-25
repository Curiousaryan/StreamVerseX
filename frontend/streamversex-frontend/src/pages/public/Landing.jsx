import LandingNavbar from "../../components/landing/LandingNavbar";
import HeroSection from "../../components/landing/HeroSection";

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <LandingNavbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}

export default Landing;