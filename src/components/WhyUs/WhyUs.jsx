import { reasons } from "../../data/reasons";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <section className={styles.whyUs} id="o-nas">
      <div className="container whyUs">
        <h2>
          Prečo <span>Východ Digital</span>?
        </h2>
        <p className={styles.subtitle}>
          Vo Východ Digital veríme, že <span> webstránka</span> má prinášať{" "}
          <span>výsledky</span>. Preto vytvárame <span>rýchle</span>,{" "}
          <span>moderné</span> a <span>premyslené</span> weby, ktoré pomáhajú
          firmám <span>získavať zákazníkov</span>, <span>budovať dôveru</span> a{" "}
          <span>profesionálnu</span> prezentáciu online.
          <br />
          <br />
          Každý projekt riešime <span>individuálne</span> a navrhujeme ho s
          dôrazom na obchodný cieľ klienta.
        </p>
        <div className={styles.grid}>
          {reasons.map((reason, i) => (
            <article className={styles.reason} key={reason.title}>
              <div className={styles.index}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={styles.body}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
              <span className={styles.corner} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
