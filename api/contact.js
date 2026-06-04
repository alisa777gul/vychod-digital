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
      to: "hello@vychoddigital.sk",
      subject: "Nová správa z webu",
      html: `
        <h2>Nová správa</h2>
        <p><b>Meno:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Správa:</b> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
