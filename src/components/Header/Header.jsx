import { useEffect, useState } from "react";
import logo from "../../assets/vychoddigital.png";
import Button from "../Button/Button";
import styles from "./Header.module.css";

const navItems = [
  { label: "Domov", href: "#home" },
  { label: "O nás", href: "#o-nas" },
  { label: "Služby", href: "#sluzby" },
  { label: "Projekty", href: "#projekty" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <a
        className={styles.logo}
        href="#home"
        aria-label="Východ Digital"
        onClick={closeMenu}
      >
        <img src={logo} alt="Východ Digital" />
      </a>

      <button
        className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isMenuOpen && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Zatvoriť menu"
          onClick={closeMenu}
        />
      )}

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <nav className={styles.nav} aria-label="Hlavná navigácia">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <Button href="#kontakt">Napíšte nám</Button>
      </div>
    </header>
  );
}
