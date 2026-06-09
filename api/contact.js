import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};

    const {
      name,
      email,
      message,
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
    } = body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing name/email" });
    }

    const isBrief = Boolean(description || type || goal);

    // 📩 EMAIL TEBE (ADMIN)
    const adminHtml = isBrief
      ? `
        <div style="font-family:Arial;padding:20px">
          <h2>📋 New PROJECT brief</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "-"}</p>
          <p><b>Company:</b> ${company || "-"}</p>
          <p><b>Type:</b> ${type || "-"}</p>
          <p><b>Description:</b> ${description || "-"}</p>
          <p><b>Goal:</b> ${goal || "-"}</p>
          <p><b>Audience:</b> ${audience || "-"}</p>
          <p><b>Design:</b> ${design || "-"}</p>
          <p><b>Features:</b> ${features?.join(", ") || "-"}</p>
          <p><b>Content:</b> ${content || "-"}</p>
          <p><b>Budget:</b> ${budget || "-"}</p>
          <p><b>Deadline:</b> ${deadline || "-"}</p>
          <p><b>Extra:</b> ${extra || "-"}</p>
        </div>
      `
      : `
        <div style="font-family:Arial;padding:20px">
          <h2>📩 New message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message || "-"}</p>
        </div>
      `;

    await resend.emails.send({
      from: "Východ Digital <onboarding@resend.dev>",
      to: "hello@vychoddigital.sk",
      replyTo: email,
      subject: isBrief ? "📋 Nový projektový dopyt" : "📩 Nová správa z webu",
      html: adminHtml,
    });

    // 💌 AUTOREPLY CLIENT (SLOVAK - FORMAL VYKANIE)
    await resend.emails.send({
      from: "Východ Digital <onboarding@resend.dev>",
      to: email,
      subject: "Potvrdzujeme prijatie Vašej správy 🚀",
      html: `
        <div style="font-family:Arial;padding:24px;line-height:1.6;color:#111">
          <h2>Dobrý deň ${name}, 👋</h2>

          <p>ďakujeme, že ste kontaktovali <b>Východ Digital</b>.</p>

          <p>Vaša správa bola úspešne prijatá a v najbližšom čase sa Vám ozveme.</p>

          <br/>

          <p><b>Čo bude nasledovať?</b></p>
          <p>
            ✔ Prezrieme si Vašu požiadavku<br/>
            ✔ Pripravíme návrh riešenia alebo odpoveď<br/>
            ✔ Ozveme sa Vám do 24 hodín
          </p>

          <br/>

          <p>
            Ak by ste chceli doplniť informácie, môžete odpovedať priamo na tento e-mail.
          </p>

          <br/>

          <p style="margin-top:20px">
            S pozdravom,<br/>
            <b>Tím Východ Digital</b>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
