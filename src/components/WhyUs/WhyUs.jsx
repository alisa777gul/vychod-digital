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
          Sme začínajúca digitálna agentúra z východného Slovenska, ktorá tvorí{" "}
          <span>moderné webové riešenia</span> pre firmy a podnikateľov. Každý
          projekt navrhujeme <span>individuálne</span> — s dôrazom na dizajn,
          rýchlosť, výkon a <span>reálne výsledky</span>.
          <br />
          <br />
          Veríme, že dobrý web nie je len pekný, ale <span>predáva</span>,
          funguje a buduje <span>dôveru</span>. Preto ku každému klientovi
          pristupujeme osobne a s maximálnou starostlivosťou.
        </p>
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
