import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import WhyUs from "../../components/WhyUs/WhyUs";
import Projects from "../../components/Projects/Projects";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import useScrollReveal from "../../hooks/useScrollReveal";

import "../../App.css";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Header />

      <main>
        <div className="reveal">
          {" "}
          <Hero />{" "}
        </div>
        <div className="reveal">
          {" "}
          <Services />
        </div>
        <div className="reveal">
          {" "}
          <WhyUs />
        </div>
        <div className="reveal">
          {" "}
          <Projects />
        </div>
        <div className="reveal">
          {" "}
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
