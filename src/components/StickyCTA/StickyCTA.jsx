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
    <div
      className={`${styles.bar} ${visible ? styles.show : ""}`}
      role="region"
      aria-label="Rýchla akcia"
    >
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">✦</span>
        <div className={styles.copy}>
          <strong>Bezplatný návrh</strong>
          <span>Odpoveď do 24 hodín</span>
        </div>
        <button
          type="button"
          data-testid="sticky-cta-button"
          onClick={() => scrollToSection("#kontakt")}
          className={styles.btn}
        >
          Napíšte nám
        </button>
      </div>
    </div>
  );
}
