/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import css from "./Contact.module.css";

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

      await emailjs.sendForm(
        "service_ur5ogyc",
        "template_i3zatn4",
        form.current,
        "o8sk9177Z3fnCr-66",
      );

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
        <h2>
          Kontakt <span>pre vás</span>
        </h2>

        <p className={css.subtitle}>
          Napíšte nám správu a odpovieme Vám čo najskôr.
        </p>

        <div className={css.grid}>
          <div className={css.info}>
            <div className={css.card}>
              <h3>Email</h3>
              <a href="mailto:hello@vychoddigital.sk">hello@vychoddigital.sk</a>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className={css.form}>
            <input name="name" type="text" placeholder="Meno" />
            <input name="email" type="email" placeholder="Email" />
            <textarea name="message" rows="5" placeholder="Správa" />

            <button type="submit" disabled={loading}>
              {loading ? "Odosielam..." : "Odoslať"}
            </button>

            {/* 👇 CUSTOM NOTIFICATION */}
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
