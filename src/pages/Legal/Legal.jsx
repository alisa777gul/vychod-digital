import { useParams, Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { legalContent } from "../../data/legal";
import styles from "./Legal.module.css";

export default function Legal() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = legalContent[slug];

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <main>
        <section className={styles.page}>
          <div className="container">
            <button
              type="button"
              data-testid="legal-back"
              onClick={() => navigate(-1)}
              className={styles.back}
            >
              <span aria-hidden="true">←</span> Späť
            </button>

            <header className={styles.head}>
              <span className={styles.kicker}>{data.kicker}</span>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.intro}>{data.intro}</p>
              <p className={styles.updated}>{data.updated}</p>
            </header>

            <article className={styles.article}>
              {data.sections.map((s) => (
                <section key={s.h} className={styles.section}>
                  <h2>{s.h}</h2>
                  {s.p.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </section>
              ))}
            </article>

            <div className={styles.cta}>
              <p>Máte otázky k tomuto dokumentu?</p>
              <a href="mailto:hello@vychoddigital.sk" className={styles.ctaLink}>
                hello@vychoddigital.sk
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
