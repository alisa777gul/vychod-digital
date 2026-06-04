/* eslint-disable no-undef */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    // 🔐 validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    if (!cleanEmail.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    console.log("NEW LEAD:", { name, email: cleanEmail });

    // 📩 1. ПИСЬМО ТЕБЕ
    const ownerEmail = await resend.emails.send({
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "gulyayevaalisa@gmail.com",
      subject: "📩 Nová správa z webu",
      html: `
        <h2>Nová správa</h2>
        <p><b>Meno:</b> ${name}</p>
        <p><b>Email:</b> ${cleanEmail}</p>
        <p><b>Správa:</b><br/>${message}</p>
      `,
    });

    console.log("OWNER EMAIL:", ownerEmail);

    // 📩 2. АВТООТВЕТ КЛИЕНТУ
    const clientEmail = await resend.emails.send({
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "alikiki607@gmail.com",
      subject: "Ďakujeme za vašu správu 🙌",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color:#111;">

          <div style="text-align:center;">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              style="width:100%; max-width:500px; border-radius:12px;"
            />
          </div>

          <h2 style="margin-top:20px;">
            Ďakujeme, ${name}! 👋
          </h2>

          <p style="font-size:16px; color:#444;">
            Dostali sme vašu správu a odpovieme vám do 24 hodín.
          </p>

          <div style="margin-top:20px; padding:15px; background:#f5f5f5; border-radius:10px;">
            <b>Východ Digital</b><br/>
            Webové štúdio
          </div>

        </div>
      `,
    });

    console.log("CLIENT EMAIL:", clientEmail);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("RESEND ERROR:", err);

    return res.status(500).json({
      error: err.message || "Server error",
    });
  }
}
