import Button from "../Button/Button";
import heroImage from "../../assets/hero-image.svg";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className="container">
        {" "}
        <div className={styles.heroInner}>
          <div className={styles.content}>
            <h1>
              Digitálne riešenia, <br />
              ktoré menia návštevníkov <br />
              <span>na zákazníkov.</span>
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

          <div className={styles.visual}>
            <img src={heroImage} alt="Notebook" width="380" height="300" />
          </div>
        </div>
      </div>
    </section>
  );
}
