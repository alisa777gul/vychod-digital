import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Brief from "./pages/Brief/Brief";
import Legal from "./pages/Legal/Legal";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import { initAnalytics, trackPageView } from "./utils/analytics";

/* 🔥 always start top */
function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

/* ✨ nicer but still safe animation */
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.28,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  // boot: if user previously accepted "all", load Meta Pixel
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/brief"
            element={
              <Page>
                <Brief />
              </Page>
            }
          />
          <Route
            path="/:slug"
            element={
              <Page>
                <Legal />
              </Page>
            }
          />
        </Routes>
      </AnimatePresence>

      <CookieConsent />
    </>
  );
}
