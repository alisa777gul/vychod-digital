import styles from "./SocialProof.module.css";

const stats = [
  { value: "24h", label: "Odpoveď garantovaná" },
  { value: "100%", label: "Spokojnosť klientov" },
  { value: "7 dní", label: "Spustenie landing page" },
  { value: "0 €", label: "Úvodná konzultácia" },
];

export default function SocialProof() {
  return (
    <section className={styles.wrap} aria-label="Dôvera a čísla">
      <div className="container">
        <div className={styles.row}>
          {stats.map((s) => (
            <div className={styles.item} key={s.label}>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.track}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div className={styles.tickerInner} key={i}>
                <span>★ Predajné weby</span>
                <span>✱ Rýchle dodanie</span>
                <span>● SEO ready</span>
                <span>✦ Custom dizajn</span>
                <span>▲ Konverzný copywriting</span>
                <span>◆ Mobile-first</span>
                <span>★ Analytika & Pixel</span>
                <span>✱ Bez šablón</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
