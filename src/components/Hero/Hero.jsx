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
              Vaša webstránka
              <br />
              by mala predávať. <br />
              <span>Nie len existovať.</span>
            </h1>

            <p>
              Ak vás ľudia nenájdu online, nájdu vašu konkurenciu. <br />{" "}
              Tvoríme webstránky, ktoré budujú dôveru, získavajú dopyty a
              pomáhajú firmám rásť.
            </p>

            <div className={styles.actions}>
              <Button
                href="#kontakt"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#kontakt");
                }}
              >
                Získať bezplatný návrh
              </Button>

              <Button
                href="#projekty"
                variant="outline"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#projekty");
                }}
              >
                Pozrieť realizácie
              </Button>
            </div>
          </div>

          <div className={styles.visual}>
            <img
              src={heroImage}
              alt="Notebook"
              width="372"
              height="299"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
