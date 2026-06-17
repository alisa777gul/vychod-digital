/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import css from "./Brief.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Brief() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  // =========================
  // 🔥 LOAD DRAFT (on open)
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("brief-draft");
    if (!saved || !formRef.current) return;

    const data = JSON.parse(saved);
    const form = formRef.current;

    Object.keys(data).forEach((key) => {
      const el = form.elements[key];
      if (!el) return;

      if (el.type === "checkbox") {
        const values = data[key] || [];
        el.checked = values.includes(el.value);
      } else {
        el.value = data[key] || "";
      }
    });
  }, []);

  const saveDraft = () => {
    const data = new FormData(formRef.current);

    const formData = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      type: data.get("type"),
      description: data.get("description"),
      goal: data.get("goal"),
      audience: data.get("audience"),
      design: data.get("design"),
      features: data.getAll("features"),
      content: data.get("content"),
      budget: data.get("budget"),
      deadline: data.get("deadline"),
      extra: data.get("extra"),
    };

    localStorage.setItem("brief-draft", JSON.stringify(formData));
  };

  const sendForm = async (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);

    const formData = {
      name: data.get("name")?.trim(),
      email: data.get("email")?.trim(),
      phone: data.get("phone")?.trim(),
      company: data.get("company")?.trim(),
      type: data.get("type"),
      description: data.get("description")?.trim(),
      goal: data.get("goal")?.trim(),
      audience: data.get("audience")?.trim(),
      design: data.get("design"),
      features: data.getAll("features"),
      content: data.get("content"),
      budget: data.get("budget"),
      deadline: data.get("deadline"),
      extra: data.get("extra")?.trim(),
    };

    if (!formData.name || !formData.email || !formData.description) {
      setStatus("empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      formRef.current.reset();

      localStorage.removeItem("brief-draft");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <>
      <Header />

      <section className={css.page}>
        <div className="container">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={css.backBtn}
          >
            Späť
          </button>

          <h1 className={css.title}>Projektový brief</h1>

          <p className={css.subtitle}>
            Povedzte nám viac o Vašom projekte a pripravíme Vám riešenie na
            mieru.
          </p>

          <form
            ref={formRef}
            onSubmit={sendForm}
            onChange={saveDraft}
            className={css.form}
          >
            {/* CONTACT */}
            <h2>Kontaktné údaje</h2>

            <input name="name" placeholder="Meno a priezvisko *" required />
            <input name="email" placeholder="E-mail *" required />
            <input name="phone" placeholder="Telefónne číslo" />
            <input name="company" placeholder="Názov spoločnosti" />

            {/* PROJECT */}
            <h2>O projekte</h2>

            <select name="type">
              <option value="">Typ projektu</option>
              <option>Landing page</option>
              <option>Firemná webstránka</option>
              <option>Portfólio</option>
              <option>Webová aplikácia</option>
              <option>Redizajn webu</option>
            </select>

            <textarea
              name="description"
              placeholder="Popíšte Vašu predstavu projektu *"
              required
            />

            {/* GOAL */}
            <h2>Cieľ projektu</h2>

            <textarea name="goal" placeholder="Aký problém má web vyriešiť?" />
            <textarea name="audience" placeholder="Cieľová skupina" />

            {/* DESIGN */}
            <h2>Dizajn</h2>

            <select name="design" required>
              <option value="">Štýl dizajnu *</option>
              <option>Moderný</option>
              <option>Minimalistický</option>
              <option>Firemný</option>
              <option>Kreatívny</option>
              <option>Luxusný</option>
            </select>

            {/* FEATURES */}
            <h2>Funkcie</h2>

            <div className={css.checks}>
              <label>
                <input type="checkbox" name="features" value="Form" /> Kontaktný
                formulár
              </label>
              <label>
                <input type="checkbox" name="features" value="Booking" />{" "}
                Rezervácie
              </label>
              <label>
                <input type="checkbox" name="features" value="Blog" /> Blog
              </label>
              <label>
                <input type="checkbox" name="features" value="Multilang" />{" "}
                Viacjazyčnosť
              </label>
              <label>
                <input type="checkbox" name="features" value="SEO" /> SEO
              </label>
            </div>

            {/* CONTENT */}
            <h2>Obsah</h2>

            <select name="content" required>
              <option value="">Máte obsah? *</option>
              <option>Áno</option>
              <option>Nie</option>
              <option>Čiastočne</option>
            </select>

            {/* BUDGET */}
            <h2>Rozpočet</h2>

            <select name="budget">
              <option value="">Vyberte rozpočet</option>
              <option>do 300 €</option>
              <option>300 – 500 €</option>
              <option>500 € a viac</option>
            </select>

            {/* DEADLINE */}
            <h2>Termín</h2>

            <select name="deadline">
              <option value="">Kedy?</option>
              <option>ASAP</option>
              <option>1–2 týždne</option>
              <option>1 mesiac</option>
              <option>flexibilné</option>
            </select>

            {/* EXTRA */}
            <h2>Doplňujúce informácie</h2>

            <textarea name="extra" placeholder="Ďalšie poznámky..." />

            {/* BUTTON */}
            <button disabled={loading}>
              {loading ? "Odosielam..." : "Odoslať projekt"}
            </button>

            {/* STATUS */}
            {status === "success" && <p className={css.success}>✔ Odoslané</p>}
            {status === "error" && <p className={css.error}>✖ Chyba</p>}
            {status === "empty" && (
              <p className={css.error}>Vyplňte povinné polia</p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
