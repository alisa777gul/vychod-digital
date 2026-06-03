import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import WhyUs from "./components/WhyUs/WhyUs";
import "./App.css";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

import Footer from "./components/Footer/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    const finish = () => {
      setFadeOut(true);

      setTimeout(() => {
        setLoading(false);
        setAppVisible(true);
      }, 600);
    };

    const images = Array.from(document.images);

    const imagePromises = images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    const timeout = setTimeout(() => {
      finish();
    }, 4000);

    Promise.all(imagePromises).then(() => {
      clearTimeout(timeout);
      finish();
    });

    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return (
      <div className={`loader ${fadeOut ? "fadeOut" : ""}`}>
        <div className="loaderInner">
          <div className="logoPulse">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="loaderText">Východ Digital</div>
          <div className="loaderLine"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${appVisible ? "show" : ""}`}>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />

        <Contact />
      </main>{" "}
      <Footer />
    </div>
  );
}
