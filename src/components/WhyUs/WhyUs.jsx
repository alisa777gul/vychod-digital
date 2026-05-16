import { reasons } from "../../data/reasons";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <section className={styles.whyUs} id="o-nas">
      <h2>Prečo Východ Digital?</h2>

      <div className={styles.grid}>
        {reasons.map((reason) => (
          <article className={styles.reason} key={reason.title}>
            <span>✓</span>

            <div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
