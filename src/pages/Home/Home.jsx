import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import WhyUs from "../../components/WhyUs/WhyUs";
import Projects from "../../components/Projects/Projects";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

import "../../App.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
