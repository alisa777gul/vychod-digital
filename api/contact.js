/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await resend.emails.send({
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "gulyayevaalisa@gmail.com",
      subject: "Nová správa z webu",
      html: `
        <h2>Nová správa</h2>
        <p><b>Meno:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Správa:</b> ${message}</p>
      `,
    });
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Ďakujeme za vašu správu 🙌",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      
      <div style="text-align:center;">
        <img 
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Vychod Digital"
          style="width:100%; max-width:500px; border-radius:12px;"
        />
      </div>

      <h2 style="color:#111; margin-top:20px;">
        Ďakujeme, ${name}! 👋
      </h2>

      <p style="font-size:16px; color:#444;">
        Dostali sme vašu správu a budeme vás kontaktovať do 24 hodín.
      </p>

      <div style="margin-top:20px; padding:15px; background:#f5f5f5; border-radius:10px;">
        <p style="margin:0;"><b>Východ Digital</b></p>
        <p style="margin:0; font-size:14px;">Webové štúdio</p>
      </div>

    </div>
  `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
