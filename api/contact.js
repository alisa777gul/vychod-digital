/* eslint-disable no-undef */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    if (!cleanEmail.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    console.log("NEW LEAD:", { name, email: cleanEmail });

    const ownerEmail = await resend.emails.send({
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "gulyayevaalisa@gmail.com",
      subject: "📩 Nová správa z webu",
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>Nová správa</h2>

          <p><b>Meno:</b> ${name}</p>
          <p><b>Email:</b> ${cleanEmail}</p>

          <p><b>Správa:</b></p>
          <p>${message}</p>
        </div>
      `,
    });

    console.log("OWNER EMAIL SENT:", ownerEmail);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("RESEND ERROR:", err);

    return res.status(500).json({
      error: err.message || "Server error",
    });
  }
}
