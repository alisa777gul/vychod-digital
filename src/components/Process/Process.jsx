import { processSteps } from "../../data/process";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section id="proces" className={styles.process}>
      <div className="container">
        <h2>
          Ako to <span>prebieha</span>
        </h2>
        <p className={styles.lead}>
          Štyri jasné kroky od prvej správy po spustený web. Bez prekvapení.
        </p>

        <ol className={styles.list}>
          {processSteps.map((step, i) => (
            <li className={styles.step} key={step.num} style={{ "--i": i }}>
              <div className={styles.num}>{step.num}</div>
              <div className={styles.body}>
                <div className={styles.head}>
                  <h3>{step.title}</h3>
                  <span className={styles.time}>{step.time}</span>
                </div>
                <p>{step.text}</p>
              </div>
              {i < processSteps.length - 1 && (
                <svg
                  className={styles.arrow}
                  viewBox="0 0 80 40"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 20 C 22 6, 50 32, 76 18"
                    fill="none"
                    stroke="#df0014"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                  />
                  <path
                    d="M68 12 L78 18 L70 26"
                    fill="none"
                    stroke="#df0014"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
