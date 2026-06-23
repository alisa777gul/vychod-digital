import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";
import { Link } from "react-router-dom";
import { getConsent, setConsent } from "../../utils/analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }

    const onOpen = () => setVisible(true);
    window.addEventListener("vd:open-cookies", onOpen);
    return () => window.removeEventListener("vd:open-cookies", onOpen);
  }, []);

  const save = (value) => {
    setConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.wrap}
      role="dialog"
      aria-label="Súhlas s cookies"
      data-testid="cookie-banner"
    >
      <div className={styles.card}>
        <div className={styles.iconWrap} aria-hidden="true">
          <span className={styles.icon}>🍪</span>
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>Používame cookies</h3>
          <p className={styles.text}>
            Pre lepší zážitok a meranie návštevnosti používame cookies.
            Pokračovaním súhlasíte s ich používaním. Viac informácií nájdete
            v <Link to="/cookies">zásadách cookies</Link>.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            data-testid="cookie-decline"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={() => save("essential")}
          >
            Iba nevyhnutné
          </button>
          <button
            type="button"
            data-testid="cookie-accept"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => save("all")}
          >
            Prijať všetko
          </button>
        </div>
      </div>
    </div>
  );
}
