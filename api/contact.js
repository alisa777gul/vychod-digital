/* eslint-disable no-undef */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body || {};

    const {
      name,
      email,
      phone,
      company,
      type,
      description,
      goal,
      audience,
      design,
      features,
      content,
      budget,
      deadline,
      extra,
    } = data;

    if (!name || !email || !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const emailHTML = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>📩 Nový projektový brief</h2>

        <p><b>Meno:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefón:</b> ${phone || "-"}</p>
        <p><b>Firma:</b> ${company || "-"}</p>

        <hr />

        <p><b>Typ projektu:</b> ${type || "-"}</p>
        <p><b>Popis:</b> ${description || "-"}</p>

        <p><b>Cieľ:</b> ${goal || "-"}</p>
        <p><b>Cieľová skupina:</b> ${audience || "-"}</p>

        <p><b>Dizajn:</b> ${design || "-"}</p>

        <p><b>Funkcie:</b> ${features?.length ? features.join(", ") : "-"}</p>

        <p><b>Obsah:</b> ${content || "-"}</p>
        <p><b>Rozpočet:</b> ${budget || "-"}</p>
        <p><b>Termín:</b> ${deadline || "-"}</p>

        <p><b>Doplňujúce info:</b> ${extra || "-"}</p>
      </div>
    `;

    await resend.emails.send({
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "gulyayevaalisa@gmail.com",
      subject: "📩 Nový projektový brief",
      html: emailHTML,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message || "Server error",
    });
  }
}
