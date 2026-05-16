import Button from "../Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.content}>
        <h1>
          Digitálne riešenia, ktoré menia návštevníkov
          <span> na zákazníkov.</span>
        </h1>

        <p>
          Tvoríme moderné webstránky, ktoré pomáhajú firmám rásť, predávať a
          vyniknúť online.
        </p>

        <div className={styles.actions}>
          <Button href="#kontakt">Získať webstránku</Button>
          <Button href="#projekty" variant="outline">
            Pozrieť prácu
          </Button>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.circle}></div>

        <div className={styles.laptop}>
          <div className={styles.screen}>
            <div className={styles.box}></div>

            <div className={styles.lines}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className={styles.base}></div>
        </div>

        <span className={styles.arrow}>↗</span>
      </div>
    </section>
  );
}
