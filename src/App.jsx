import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import WhyUs from "./components/WhyUs/WhyUs";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFadeOut(true);

      setTimeout(() => {
        setLoading(false);
      }, 600);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
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
    <div className="appFadeIn">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
      </main>
    </div>
  );
}
