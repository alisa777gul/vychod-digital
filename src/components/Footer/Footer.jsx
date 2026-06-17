import styles from "./Footer.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";
import instagramIcon from "../../assets/instagram-logo.svg?react";
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

        {/* NORMAL MODE */}
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

        {/* BRIEF MODE (compact footer) */}
        {isBriefPage && (
          <div className={styles.links}>
            <h4>Potrebujete pomoc?</h4>

            <a href="mailto:info@vychoddigital.sk">info@vychoddigital.sk</a>

            <button onClick={() => navigate("/")} className={styles.backButton}>
              ← Späť
            </button>
          </div>
        )}

        <div className={styles.contact}>
          <h4>Kontakt</h4>

          <a href="mailto:hello@vychoddigital.sk">hello@vychoddigital.sk</a>
          <a
            href="https://www.instagram.com/vychod.digital"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
          >
            <img src={instagramIcon} alt="Instagram" className={styles.icon} />
            <span>Instagram</span>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Východ Digital</p>
      </div>
    </footer>
  );
}
