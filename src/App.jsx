import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect } from "react";

import Home from "./pages/Home/Home";
import Brief from "./pages/Brief/Brief";

/* 🔥 SCROLL RESET */
function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1], // Apple-like easing
      }}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

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
        </Routes>
      </AnimatePresence>
    </>
  );
}
