import { useEffect, useState } from "react";
import styles from "./StickyCTA.module.css";
import { scrollToSection } from "../../utils/scrollToSection";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const kontakt = document.getElementById("kontakt");
      const reachedContact = kontakt
        ? kontakt.getBoundingClientRect().top < window.innerHeight - 40
        : false;
      setVisible(y > 600 && !reachedContact && y < max - 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      data-testid="sticky-cta-button"
      aria-label="Napíšte nám"
      onClick={() => scrollToSection("#kontakt")}
      className={`${styles.fab} ${visible ? styles.show : ""}`}
    >
      <span className={styles.tooltip}>Napíšte nám</span>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 5h16v14H4z" />
        <path d="M4 5l8 7 8-7" />
      </svg>
      <span className={styles.dot} aria-hidden="true" />
    </button>
  );
}
