import { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import { scrollToSection } from "../../utils/scrollToSection";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Služby", href: "#sluzby" },
  { label: "Proces", href: "#proces" },
  { label: "Projekty", href: "#projekty" },
  { label: "Cenník", href: "#cennik" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isBriefPage = location.pathname === "/brief";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const goHomeAndScroll = (href) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(href), 100);
      return;
    }

    scrollToSection(href);
  };

  const goHome = () => {
    closeMenu();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* LOGO */}
      <a
        href="/"
        className={styles.logo}
        onClick={(e) => {
          e.preventDefault();
          goHome();
        }}
      >
        <img src="/logo.svg" alt="Logo" />
      </a>

      {/* NAVIGATION ONLY ON HOME */}
      {!isBriefPage && (
        <>
          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="menu"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>

          <div
            className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goHomeAndScroll(item.href);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button
              onClick={(e) => {
                e.preventDefault();
                goHomeAndScroll("#kontakt");
              }}
            >
              Napíšte nám
            </Button>
          </div>

          {isMenuOpen && (
            <button className={styles.backdrop} onClick={closeMenu} />
          )}
        </>
      )}
    </header>
  );
}
