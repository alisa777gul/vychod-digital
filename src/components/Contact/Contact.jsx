/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import css from "./Contact.module.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  // "success" | "error" | "empty" | null

  const sendEmail = async (e) => {
    e.preventDefault();

    if (loading) return;

    const data = new FormData(form.current);

    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const message = data.get("message")?.trim();

    if (!name || !email || !message) {
      setStatus("empty");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!response.ok) throw new Error();
      if (window.fbq) {
        window.fbq("track", "Lead");
      }
      setStatus("success");
      form.current.reset();
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };
  return (
    <section id="kontakt" className={css.contact}>
      <div className="container">
        <h2 className="visually-hidden">
          Kontakt <span>pre vás</span>
        </h2>

        <p className={css.subtitle}>
          <span> Pripravení získať viac zákazníkov online? </span> <br />
          Pošlite nám nezáväznú správu a do 24 hodín vám navrhneme riešenie na
          mieru.
        </p>

        <div className={css.grid}>
          <div className={css.info}>
            <div className={css.card}>
              <h3>Email</h3>
              <a href="mailto:hello@vychoddigital.sk">hello@vychoddigital.sk</a>
            </div>
            <p className={css.formLinkText}>
              Povedzte nám viac o Vašej predstave projektu:
            </p>
            <div className={css.card}>
              <Link to="/brief" className={css.formLink}>
                Získať bezplatnú konzultáciu
              </Link>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className={css.form}>
            <input name="name" type="text" placeholder="Meno" />
            <input name="email" type="email" placeholder="Email" />
            <textarea name="message" rows="5" placeholder="Správa" />

            <button
              type="submit"
              disabled={loading}
              onClick={() => {
                if (window.fbq) {
                  window.fbq("track", "Contact");
                }
              }}
            >
              {loading ? "Odosielam..." : "Odoslať"}
            </button>

            {status === "success" && (
              <p className={`${css.notice} ${css.success}`}>
                ✔ Správa bola úspešne odoslaná
              </p>
            )}

            {status === "error" && (
              <p className={`${css.notice} ${css.error}`}>
                ✖ Chyba pri odosielaní
              </p>
            )}

            {status === "empty" && (
              <p className={`${css.notice} ${css.error}`}>
                Vyplňte všetky polia
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
