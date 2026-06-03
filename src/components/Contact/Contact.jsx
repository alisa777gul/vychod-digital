import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import css from "./Contact.module.css";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(form.current);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !message) {
      toast.error("Prosím, vyplňte všetky polia");
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

      toast.success("Vaša správa bola úspešne odoslaná");

      form.current.reset();
    } catch (error) {
      console.error(error);
      toast.error("Chyba pri odosielaní. Skúste to znova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className={css.contact}>
      <div className={css.container}>
        <h2>
          Kontakt <span>pre vás</span>
        </h2>

        <p className={css.subtitle}>
          Ak máte záujem o spoluprácu, napíšte nám správu a odpoviem vám čo
          najskôr.
        </p>

        <div className={css.grid}>
          {/* INFO */}
          <div className={css.info}>
            <div className={css.card}>
              <h3>Email</h3>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </div>

            <div className={css.card}>
              <h3>Telefón</h3>
              <a href="tel:+421900000000">+421 900 000 000</a>
            </div>
          </div>

          {/* FORM */}
          <form ref={form} onSubmit={sendEmail} className={css.form} noValidate>
            <input name="name" type="text" placeholder="Vaše meno" />
            <input name="email" type="email" placeholder="Email" />
            <textarea name="message" rows="5" placeholder="Správa" />

            <button type="submit" disabled={loading}>
              {loading ? "Odosielam..." : "Odoslať správu"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
