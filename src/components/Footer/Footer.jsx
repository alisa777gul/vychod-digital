import styles from "./Footer.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const isBriefPage = location.pathname === "/brief";

  const goTo = (hash) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(hash), 100);
      return;
    }

    scrollToSection(hash);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <p>
            Východ <span>Digital</span> – digitálna agentúra
          </p>
        </div>

        {/* NAVIGATION — HIDE ON BRIEF */}
        {!isBriefPage && (
          <div className={styles.links}>
            <h4>Navigácia</h4>

            <a onClick={() => goTo("#home")}>Domov</a>
            <a onClick={() => goTo("#sluzby")}>Služby</a>
            <a onClick={() => goTo("#o-nas")}>O nás</a>
            <a onClick={() => goTo("#projekty")}>Projekty</a>
            <a onClick={() => goTo("#kontakt")}>Kontakt</a>
          </div>
        )}

        <div className={styles.contact}>
          <h4>Kontakt</h4>

          <a href="mailto:hello@vychoddigital.sk">hello@vychoddigital.sk</a>
          <a href="tel:+421900000000">+421 900 000 000</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Východ Digital</p>
      </div>
    </footer>
  );
}
