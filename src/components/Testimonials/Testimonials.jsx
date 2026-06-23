import { testimonials } from "../../data/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section id="referencie" className={styles.wrap}>
      <div className="container">
        <h2>
          Hovoria <span>klienti</span>
        </h2>
        <p className={styles.lead}>
          Reálne ohlasy od ľudí, ktorým web priniesol prvých zákazníkov.
        </p>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              className={styles.card}
              style={{ "--i": i }}
            >
              <div className={styles.quote} aria-hidden="true">
                &ldquo;
              </div>

              <p className={styles.text}>{t.text}</p>

              <div className={styles.stars} aria-label={`${t.rating} z 5`}>
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>

              <div className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
