import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import WhyUs from "./components/WhyUs/WhyUs";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        setLoading(false);
      }, 400);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`loader ${fadeOut ? "fadeOut" : ""}`}>
        <div className="loaderInner">
          <div className="logoPulse">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="loaderText">Východ Digital</div>
          <div className="loaderLine" />
        </div>
      </div>
    );
  }

  return (
    <div className="app show">
      <Header />

      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
