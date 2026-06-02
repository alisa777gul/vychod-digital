import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";

const navItems = [
  { label: "Domov", href: "top" },
  { label: "Služby", href: "#sluzby" },
  { label: "O nás", href: "#o-nas" },
  { label: "Projekty", href: "#projekty" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    closeMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (href) => {
    const section = document.querySelector(href);

    if (!section) return;

    const headerHeight = headerRef.current?.offsetHeight || 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    closeMenu();

    window.scrollTo({
      top: sectionTop - headerHeight - 18,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <a
          className={styles.logo}
          href="#top"
          aria-label="Východ Digital - Domov"
          onClick={(event) => {
            event.preventDefault();
            scrollToTop();
          }}
        >
          <img src="/logo.svg" alt="Východ Digital" />
        </a>

        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        <div
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
          id="main-menu"
        >
          <nav className={styles.nav} aria-label="Hlavná navigácia">
            {navItems.map((item) =>
              item.href === "top" ? (
                <button
                  className={styles.navButton}
                  key={item.href}
                  type="button"
                  onClick={scrollToTop}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <Button
            href="#kontakt"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#kontakt");
            }}
          >
            Napíšte nám
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Zatvoriť menu"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
