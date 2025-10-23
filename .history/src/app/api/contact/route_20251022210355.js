import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data || {};

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;
    const from = process.env.CONTACT_FROM || user || email;

    if (!host || !user || !pass) {
      console.warn("SMTP env missing. Logging message instead.");
      console.log({ name, email, phone, message });
      return new Response(JSON.stringify({ ok: true, logged: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `New contact from ${name}`;
    const html = `
      <h2>New Contact</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${(message || "").replace(/\n/g, "<br>")}</p>
    `;

    await transporter.sendMail({ from, to, subject, html, replyTo: email });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
