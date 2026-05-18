import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import TrustBar from "../components/sections/TrustBar";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Solutions from "../components/sections/Solutions";
import Analytics from "../components/sections/Analytics";
import MultiTenant from "../components/sections/MultiTenant";
import Integrations from "../components/sections/Integrations";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "../components/sections/Pricing";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/footer/Footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <Solutions />
      <Analytics />
      <MultiTenant />
      <Integrations />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}