import { useEffect, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = (href) => {
    closeMenu();
    scrollToSection(href);
  };

  const handleTop = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        {/* LOGO */}
        <a
          href="#home"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            handleTop();
          }}
        >
          <img src="/logo.svg" alt="Logo" />
        </a>

        {/* BURGER */}
        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="menu"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        {/* MENU */}
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();

                  if (item.href === "#home") handleTop();
                  else handleScroll(item.href);
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
              handleScroll("#kontakt");
            }}
          >
            Napíšte nám
          </Button>
        </div>
      </header>

      {/* BACKDROP */}
      {isMenuOpen && <button className={styles.backdrop} onClick={closeMenu} />}
    </>
  );
}
