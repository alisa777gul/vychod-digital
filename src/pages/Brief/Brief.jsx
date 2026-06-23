/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import css from "./Brief.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const REQUIRED_FIELDS = ["name", "email", "description", "design", "content"];

export default function Brief() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [draftSaved, setDraftSaved] = useState(false);
  const navigate = useNavigate();

  // ── Load draft from localStorage ───────────────
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

    updateProgress();
  }, []);

  const updateProgress = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    let filled = 0;
    REQUIRED_FIELDS.forEach((f) => {
      const v = data.get(f);
      if (v && v.toString().trim() !== "") filled++;
    });
    setProgress(Math.round((filled / REQUIRED_FIELDS.length) * 100));
  };

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
    updateProgress();
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 1500);
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.description ||
      !formData.design ||
      !formData.content
    ) {
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
      setProgress(0);
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4500);
    }
  };

  return (
    <>
      <Header />

      <main>
        <section className={css.page}>
          <div className="container">
            <button
              type="button"
              data-testid="brief-back"
              onClick={() => navigate("/")}
              className={css.backBtn}
            >
              <span aria-hidden="true">←</span> Späť
            </button>

            <header className={css.head}>
              <span className={css.kicker}>Projektový brief</span>
              <h1 className={css.title}>
                Povedzte nám viac <span>o Vašom projekte</span>
              </h1>
              <p className={css.subtitle}>
                Vyplnenie zaberie ~3 minúty. Brief uložíme automaticky, takže
                sa môžete kedykoľvek vrátiť.
              </p>

              <div className={css.progressWrap} aria-label="Postup vyplnenia">
                <div className={css.progressLabel}>
                  <span>Postup</span>
                  <span className={css.progressValue}>{progress}%</span>
                </div>
                <div className={css.progressTrack}>
                  <div
                    className={css.progressBar}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </header>

            <form
              ref={formRef}
              onSubmit={sendForm}
              onChange={saveDraft}
              className={css.form}
              data-testid="brief-form"
            >
              {/* ── 1. KONTAKT ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>01</span>
                  <h2>Kontaktné údaje</h2>
                </div>
                <div className={css.fields}>
                  <Field label="Meno a priezvisko *">
                    <input name="name" placeholder="Vaše meno" required />
                  </Field>
                  <Field label="E-mail *">
                    <input
                      name="email"
                      type="email"
                      placeholder="vy@firma.sk"
                      required
                    />
                  </Field>
                  <Field label="Telefónne číslo">
                    <input name="phone" placeholder="+421" />
                  </Field>
                  <Field label="Názov spoločnosti">
                    <input name="company" placeholder="Vaša firma" />
                  </Field>
                </div>
              </div>

              {/* ── 2. PROJEKT ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>02</span>
                  <h2>O projekte</h2>
                </div>
                <div className={css.fields}>
                  <Field label="Typ projektu">
                    <select name="type">
                      <option value="">Vyberte typ</option>
                      <option>Landing page</option>
                      <option>Firemná webstránka</option>
                      <option>Portfólio</option>
                      <option>Webová aplikácia</option>
                      <option>Redizajn webu</option>
                    </select>
                  </Field>
                  <Field label="Popíšte Vašu predstavu *" wide>
                    <textarea
                      name="description"
                      placeholder="Aký web chcete? Pre koho? Čo je jeho cieľom?"
                      required
                    />
                  </Field>
                </div>
              </div>

              {/* ── 3. CIEĽ ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>03</span>
                  <h2>Cieľ projektu</h2>
                </div>
                <div className={css.fields}>
                  <Field label="Aký problém má web vyriešiť?" wide>
                    <textarea
                      name="goal"
                      placeholder="Napríklad: získať viac dopytov, vyzerať profesionálnejšie, ..."
                    />
                  </Field>
                  <Field label="Cieľová skupina" wide>
                    <textarea
                      name="audience"
                      placeholder="Pre koho je web určený? (vek, záujmy, lokalita)"
                    />
                  </Field>
                </div>
              </div>

              {/* ── 4. DIZAJN ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>04</span>
                  <h2>Dizajn</h2>
                </div>
                <div className={css.fields}>
                  <Field label="Štýl dizajnu *">
                    <select name="design" required>
                      <option value="">Vyberte štýl</option>
                      <option>Moderný</option>
                      <option>Minimalistický</option>
                      <option>Firemný</option>
                      <option>Kreatívny</option>
                      <option>Luxusný</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* ── 5. FUNKCIE ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>05</span>
                  <h2>Funkcie</h2>
                </div>
                <p className={css.hint}>
                  Vyberte všetko, čo by Váš web mal mať:
                </p>
                <div className={css.checks}>
                  {[
                    ["Form", "Kontaktný formulár"],
                    ["Booking", "Rezervácie"],
                    ["Blog", "Blog"],
                    ["Multilang", "Viacjazyčnosť"],
                    ["SEO", "Pokročilé SEO"],
                    ["CMS", "CMS / admin"],
                  ].map(([val, label]) => (
                    <label key={val} className={css.check}>
                      <input type="checkbox" name="features" value={val} />
                      <span className={css.checkBox} aria-hidden="true" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── 6. OBSAH ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>06</span>
                  <h2>Obsah & termín</h2>
                </div>
                <div className={css.fields}>
                  <Field label="Máte pripravený obsah? *">
                    <select name="content" required>
                      <option value="">Vyberte</option>
                      <option>Áno</option>
                      <option>Nie</option>
                      <option>Čiastočne</option>
                    </select>
                  </Field>
                  <Field label="Rozpočet">
                    <select name="budget">
                      <option value="">Vyberte</option>
                      <option>do 300 €</option>
                      <option>300 – 500 €</option>
                      <option>500 – 1000 €</option>
                      <option>1000 € a viac</option>
                    </select>
                  </Field>
                  <Field label="Kedy by ste chceli spustiť?">
                    <select name="deadline">
                      <option value="">Vyberte</option>
                      <option>ASAP</option>
                      <option>1 – 2 týždne</option>
                      <option>1 mesiac</option>
                      <option>flexibilné</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* ── 7. EXTRA ── */}
              <div className={css.block}>
                <div className={css.blockHead}>
                  <span className={css.num}>07</span>
                  <h2>Doplňujúce informácie</h2>
                </div>
                <div className={css.fields}>
                  <Field label="Niečo, čo by sme mali vedieť?" wide>
                    <textarea
                      name="extra"
                      placeholder="Inšpirácie, referenčné weby, špeciálne požiadavky..."
                    />
                  </Field>
                </div>
              </div>

              {/* ── SUBMIT ── */}
              <div className={css.submitRow}>
                <button
                  type="submit"
                  data-testid="brief-submit"
                  disabled={loading}
                  className={css.submit}
                >
                  {loading ? "Odosielam..." : "Odoslať brief"}
                  <span aria-hidden="true" className={css.arrow}>
                    →
                  </span>
                </button>

                <p className={css.draftHint}>
                  {draftSaved
                    ? "✓ Uložené"
                    : "Brief sa ukladá automaticky"}
                </p>
              </div>

              {/* ── STATUS ── */}
              {status === "success" && (
                <p className={`${css.notice} ${css.success}`}>
                  ✔ Brief úspešne odoslaný. Odpovieme do 24 hodín.
                </p>
              )}
              {status === "error" && (
                <p className={`${css.notice} ${css.error}`}>
                  ✖ Nepodarilo sa odoslať. Skúste znova alebo napíšte na
                  hello@vychoddigital.sk
                </p>
              )}
              {status === "empty" && (
                <p className={`${css.notice} ${css.error}`}>
                  Vyplňte prosím všetky polia označené hviezdičkou *
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Field({ label, wide, children }) {
  return (
    <label className={`${css.field} ${wide ? css.wide : ""}`}>
      <span className={css.label}>{label}</span>
      {children}
    </label>
  );
}
