import { services } from "../../data/services";
import styles from "./Services.module.css";
import "./Services.module.css";

export default function Services() {
  return (
    <section className={styles.services} id="sluzby">
      <div className="container">
        <h2 className={styles.title}>
          Čo pre vás <span>vytvoríme</span>
        </h2>

        <div className={styles.grid}>
          {services.map(({ title, text, icon }) => (
            <article className={styles.card} key={title}>
              <div className={styles.icon}>
                <img src={icon} alt={title} />
              </div>

              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
