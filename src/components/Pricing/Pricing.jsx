import { packages } from "../../data/packages";
import styles from "./Pricing.module.css";
import { scrollToSection } from "../../utils/scrollToSection";

export default function Pricing() {
  return (
    <section id="cennik" className={styles.wrap}>
      <div className="container">
        <h2>
          Balíky <span>na mieru</span>
        </h2>
        <p className={styles.lead}>
          Transparentné ceny. Žiadne skryté poplatky. Vyberte si štart, alebo si
          dohodneme balík presne pre vás.
        </p>

        <div className={styles.grid}>
          {packages.map((p, i) => (
            <article
              key={p.id}
              data-testid={`pricing-card-${p.id}`}
              className={`${styles.card} ${p.highlight ? styles.highlight : ""}`}
              style={{ "--i": i }}
            >
              {p.highlight && (
                <span className={styles.ribbon}>{p.tag}</span>
              )}
              {!p.highlight && <span className={styles.subtag}>{p.tag}</span>}

              <h3 className={styles.name}>{p.name}</h3>
              <div className={styles.priceRow}>
                <span className={styles.price}>{p.price}</span>
              </div>
              <p className={styles.desc}>{p.desc}</p>

              <ul className={styles.list}>
                {p.features.map((f) => (
                  <li key={f}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                data-testid={`pricing-cta-${p.id}`}
                className={styles.cta}
                onClick={() => scrollToSection("#kontakt")}
              >
                {p.cta}
              </button>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          Nehodí sa žiaden balík? Napíšte nám – pripravíme cenovú ponuku presne
          podľa vašich potrieb.
        </p>
      </div>
    </section>
  );
}
