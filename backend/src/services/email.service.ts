import createGmailClient from "../config/email.config.js";
import config from "../config/config.js";

interface MailBodyParams {
  to: string;
  from: string;
  subject: string;
  message: string;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

interface SendEmailResult {
  success?: boolean;
  error?: boolean;
  message: string;
}

const mailBody = ({ to, from, subject, message }: MailBodyParams): string => {
  const str = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    "",
    message,
  ].join("\n");

  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams): Promise<SendEmailResult> {
  try {
    console.log("📩 Sending email to:", to);

    const emailUser = config.EMAIL_USER;
    if (!emailUser) throw new Error("EMAIL_USER is not defined in environment");

    const gmail = createGmailClient();

    const rawMessage = mailBody({
      to,
      from: emailUser,
      subject,
      message: html ?? text ?? "",
    });

    const info = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: rawMessage,
      },
    });

    console.log("✅ Email sent successfully:", info.data.id);
    return { success: true, message: "Email Sent" };

  } catch (error: unknown) {
    console.error("❌ Email Error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return { error: true, message };
  }
}