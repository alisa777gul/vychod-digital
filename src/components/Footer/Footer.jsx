import styles from "./Footer.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";
import instagramIcon from "../../assets/instagram-logo.svg?react";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const isBriefPage = location.pathname === "/brief";
  const year = new Date().getFullYear();

  const goTo = (hash) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(hash), 100);
      return;
    }
    scrollToSection(hash);
  };

  return (
    <footer className={styles.footer} data-testid="site-footer">
      {/* ─── BIG STATEMENT ─── */}
      <div className={`${styles.statement} ${isBriefPage ? styles.hideOnBrief : ""}`}>
        <div className={styles.container}>
          <p className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            Aktuálne prijímame nové projekty
          </p>
          <h2 className={styles.statementTitle}>
            Postavme spolu web,
            <br />
            ktorý <span>reálne predáva.</span>
          </h2>
          <button
            type="button"
            data-testid="footer-cta"
            className={styles.statementCta}
            onClick={() => goTo("#kontakt")}
          >
            Napíšte nám
            <span aria-hidden="true" className={styles.arrow}>
              →
            </span>
          </button>
        </div>
      </div>

      {/* ─── MAIN COLUMNS ─── */}
      <div className={styles.main}>
        <div className={`${styles.container} ${styles.grid}`}>
          {/* BRAND */}
          <div className={styles.col}>
            <div className={styles.logoWrap}>
              <div>
                <p className={styles.brandTitle}>
                  Východ <span>Digital</span>
                </p>
                <p className={styles.brandTag}>digitálna agentúra · Slovensko</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Tvoríme webstránky, ktoré budujú dôveru, získavajú dopyty
              a pomáhajú firmám rásť online.
            </p>
          </div>

          {/* NAVIGATION */}
          {!isBriefPage && (
            <div className={styles.col}>
              <h4 className={styles.h4}>Navigácia</h4>
              <ul className={styles.linkList}>
                <li><button onClick={() => goTo("#sluzby")}>Služby</button></li>
                <li><button onClick={() => goTo("#proces")}>Proces</button></li>
                <li><button onClick={() => goTo("#projekty")}>Projekty</button></li>
                <li><button onClick={() => goTo("#referencie")}>Referencie</button></li>
                <li><button onClick={() => goTo("#cennik")}>Cenník</button></li>
                <li><button onClick={() => goTo("#faq")}>FAQ</button></li>
              </ul>
            </div>
          )}

          {/* SERVICES */}
          {!isBriefPage && (
            <div className={styles.col}>
              <h4 className={styles.h4}>Služby</h4>
              <ul className={styles.linkList}>
                <li><button onClick={() => goTo("#sluzby")}>Webstránky na mieru</button></li>
                <li><button onClick={() => goTo("#sluzby")}>Landing pages</button></li>
                <li><button onClick={() => goTo("#sluzby")}>UI / UX dizajn</button></li>
                <li><button onClick={() => goTo("#sluzby")}>Digitálna stratégia</button></li>
                <li><button onClick={() => navigate("/brief")}>Brief projektu</button></li>
              </ul>
            </div>
          )}

          {/* CONTACT */}
          <div className={styles.col}>
            <h4 className={styles.h4}>Kontakt</h4>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:hello@vychoddigital.sk" className={styles.contactLink}>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>hello@vychoddigital.sk</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vychod.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <span className={styles.contactLabel}>Social</span>
                  <span className={`${styles.contactValue} ${styles.instaRow}`}>
                    <img
                      src={instagramIcon}
                      alt=""
                      aria-hidden="true"
                      className={styles.instaIcon}
                    />
                    @vychod.digital
                  </span>
                </a>
              </li>
              <li>
                <div className={styles.contactLink}>
                  <span className={styles.contactLabel}>Lokalita</span>
                  <span className={styles.contactValue}>Slovensko · remote</span>
                </div>
              </li>
            </ul>

            {isBriefPage && (
              <button
                onClick={() => navigate("/")}
                className={styles.backButton}
              >
                <span aria-hidden="true">←</span> Späť na hlavnú
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM STRIP ─── */}
      <div className={styles.bottom}>
        <div className={`${styles.container} ${styles.bottomInner}`}>
          <p className={styles.copy}>
            © {year} <strong>Východ Digital</strong>. Všetky práva vyhradené.
          </p>
          <ul className={styles.legal}>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Ochrana údajov
              </a>
            </li>
            <li aria-hidden="true" className={styles.sep}>·</li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Cookies
              </a>
            </li>
            <li aria-hidden="true" className={styles.sep}>·</li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Obchodné podmienky
              </a>
            </li>
          </ul>
          <p className={styles.signature}>
            Made with <span aria-hidden="true">✦</span> na východe Slovenska
          </p>
        </div>
      </div>
    </footer>
  );
}
