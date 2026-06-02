import { reasons } from "../../data/reasons";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <section className={styles.whyUs} id="o-nas">
      <div className="container whyUs">
        <h2>
          Prečo <span>Východ Digital</span>?
        </h2>

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
      </div>
    </section>
  );
}
