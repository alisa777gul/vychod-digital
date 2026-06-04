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

    // 📩 1. ПИСЬМО ТЕБЕ (лид)
    const ownerEmail = await resend.emails.send({
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "gulyayevaalisa@gmail.com",
      subject: "📩 Nová správa z webu",
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>Nová správa</h2>
          <p><b>Meno:</b> ${name}</p>
          <p><b>Email:</b> ${cleanEmail}</p>
          <p><b>Správa:</b><br/>${message}</p>
        </div>
      `,
    });

    console.log("OWNER EMAIL SENT:", ownerEmail);

    // 📩 2. АВТООТВЕТ КЛИЕНТУ (premium design)
    resend.emails
      .send({
        from: "Vychod Digital <onboarding@resend.dev>",
        to: cleanEmail,
        subject: "Ďakujeme za vašu správu | Vychod Digital",
        html: `
        <div style="background:#f6f7fb;padding:40px 0;font-family:Arial, sans-serif;">

          <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              style="width:100%;height:220px;object-fit:cover;"
            />

            <div style="padding:32px;">

              <h1 style="margin:0;font-size:22px;color:#111;">
                Ďakujeme, ${name} 👋
              </h1>

              <p style="font-size:15px;line-height:1.6;color:#555;margin-top:12px;">
                Dostali sme vašu správu a náš tím vás bude kontaktovať do 24 hodín.
                Vytvárame moderné webstránky, ktoré prinášajú zákazníkov.
              </p>

              <div style="margin-top:24px;padding:16px;background:#f4f6ff;border-radius:12px;">
                <p style="margin:0;font-size:14px;color:#333;">
                  💡 Medzitým si môžete pozrieť naše práce alebo nás kontaktovať späť kedykoľvek.
                </p>
              </div>

              <div style="margin-top:28px;border-top:1px solid #eee;padding-top:20px;">
                <p style="margin:0;font-weight:600;color:#111;">Východ Digital</p>
                <p style="margin:4px 0 0;font-size:13px;color:#777;">
                  Web Development Studio
                </p>
              </div>

            </div>

          </div>

          <p style="text-align:center;font-size:12px;color:#999;margin-top:16px;">
            © ${new Date().getFullYear()} Východ Digital
          </p>

        </div>
      `,
      })
      .catch((err) => {
        console.log("AUTO EMAIL ERROR:", err);
      });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("RESEND ERROR:", err);

    return res.status(500).json({
      error: err.message || "Server error",
    });
  }
}
