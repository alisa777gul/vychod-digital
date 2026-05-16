import { services } from "../../data/services";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className={styles.services} id="sluzby">
      <h2>
        Čo pre vás <span>vytvoríme</span>
      </h2>

      <div className={styles.grid}>
        {services.map((service) => (
          <article className={styles.card} key={service.title}>
            <div className={styles.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
