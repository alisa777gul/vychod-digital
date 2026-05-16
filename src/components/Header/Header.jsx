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
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="#home" aria-label="Východ Digital">
        <img src={logo} alt="Východ Digital" />
      </a>

      <nav className={styles.nav} aria-label="Hlavná navigácia">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Button href="#kontakt">Napíšte nám</Button>
    </header>
  );
}
