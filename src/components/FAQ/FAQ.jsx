import { useState } from "react";
import { faq } from "../../data/faq";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const toggle = (i) => setOpen((cur) => (cur === i ? -1 : i));

  return (
    <section id="faq" className={styles.wrap}>
      <div className="container">
        <h2>
          Časté <span>otázky</span>
        </h2>
        <p className={styles.lead}>
          Stručné odpovede na to, čo sa nás pýtate najčastejšie.
        </p>

        <ul className={styles.list}>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
              >
                <button
                  type="button"
                  className={styles.q}
                  aria-expanded={isOpen}
                  data-testid={`faq-toggle-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>

                <div className={styles.a} aria-hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
