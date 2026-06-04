import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* BRAND */}
        <div className={styles.brand}>
          <p>
            Východ <span>Digital</span> – digitálna agentúra zameraná na weby,
            ktoré prinášajú výsledky, nie len dizajn.
          </p>
        </div>

        {/* NAV */}
        <div className={styles.links}>
          <h4>Navigácia</h4>

          <a href="#home">Domov</a>
          <a href="#sluzby">Služby</a>
          <a href="#o-nas">O nás</a>
          <a href="#projekty">Projekty</a>
          <a href="#kontakt">Kontakt</a>
        </div>

        {/* CONTACT */}
        <div className={styles.contact}>
          <h4>Kontakt</h4>

          <a href="mailto:hello@vychoddigital.sk">hello@vychoddigital.sk</a>
          <a href="tel:+421900000000">+421 900 000 000</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Východ Digital. Všetky práva vyhradené.
        </p>
      </div>
    </footer>
  );
}
