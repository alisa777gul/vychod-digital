import Button from "../Button/Button";
import styles from "./Hero.module.css";
import { scrollToSection } from "../../utils/scrollToSection";
import heroImage from "../../assets/heroImage.webp";
export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.content}>
            <h1>
              Digitálne riešenia, <br />
              ktoré menia návštevníkov <br />
              <span>na zákazníkov.</span>
            </h1>

            <p>
              Navrhujeme moderné a rýchle weby pre podnikateľov na Slovensku,
              ktoré budujú dôveru a zvyšujú počet dopytov.
            </p>

            <div className={styles.actions}>
              <Button
                href="#kontakt"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#kontakt");
                }}
              >
                Chcem návrh webstránky
              </Button>

              <Button
                href="#projekty"
                variant="outline"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#projekty");
                }}
              >
                Pozrieť prácu
              </Button>
            </div>
          </div>

          <div className={styles.visual}>
            <img
              src={heroImage}
              alt="Notebook"
              width="380"
              height="300"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
