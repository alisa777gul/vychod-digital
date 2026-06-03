import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import { scrollToSection } from "../../utils/scrollToSection";

const navItems = [
  { label: "Domov", href: "#home" },
  { label: "Služby", href: "#sluzby" },
  { label: "O nás", href: "#o-nas" },
  { label: "Projekty", href: "#projekty" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const headerRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleScrollToTop = () => {
    closeMenu();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToSection = (href) => {
    closeMenu();
    scrollToSection(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        {/* LOGO */}
        <a
          className={styles.logo}
          href="#home"
          aria-label="Home"
          onClick={(e) => {
            e.preventDefault();
            handleScrollToTop();
          }}
        >
          <img src="/logo.svg" alt="Logo" />
        </a>

        {/* BURGER */}
        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        {/* MENU */}
        <div
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
          id="main-menu"
        >
          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();

                  if (item.href === "#home") {
                    handleScrollToTop();
                  } else {
                    handleScrollToSection(item.href);
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("#kontakt");
            }}
          >
            Napíšte nám
          </Button>
        </div>
      </header>

      {/* BACKDROP */}
      {isMenuOpen && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
