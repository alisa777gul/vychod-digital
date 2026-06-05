/* eslint-disable no-undef */
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

    const html = isBrief
      ? `
        <div style="font-family:Arial;padding:20px">
          <h2>📩 New PROJECT brief</h2>
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
      from: "Vychod Digital <onboarding@resend.dev>",
      to: "gulyayevaalisa@gmail.com",
      subject: isBrief ? "📋 New Project Brief" : "📩 New Message",
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
