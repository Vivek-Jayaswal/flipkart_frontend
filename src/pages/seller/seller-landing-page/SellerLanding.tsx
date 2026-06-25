import Hero from "./Hero";
import Features from "./Feature";
import HowItWorks from "./HowItsWork";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTA from "./CTA";

const SellerLandingPage = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
};

export default SellerLandingPage;
