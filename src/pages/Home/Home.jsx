import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import SocialProof from "../../components/SocialProof/SocialProof";
import Services from "../../components/Services/Services";
import Process from "../../components/Process/Process";
import WhyUs from "../../components/WhyUs/WhyUs";
import Projects from "../../components/Projects/Projects";
import Testimonials from "../../components/Testimonials/Testimonials";
import Pricing from "../../components/Pricing/Pricing";
import FAQ from "../../components/FAQ/FAQ";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import StickyCTA from "../../components/StickyCTA/StickyCTA";
import useScrollReveal from "../../hooks/useScrollReveal";

import "../../App.css";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Header />

      <main>
        <div className="reveal">
          <Hero />
        </div>
        <div className="reveal">
          <SocialProof />
        </div>
        <div className="reveal">
          <Services />
        </div>
        <div className="reveal">
          <Process />
        </div>
        <div className="reveal">
          <WhyUs />
        </div>
        <div className="reveal">
          <Projects />
        </div>
        <div className="reveal">
          <Testimonials />
        </div>
        <div className="reveal">
          <Pricing />
        </div>
        <div className="reveal">
          <FAQ />
        </div>
        <div className="reveal">
          <Contact />
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
