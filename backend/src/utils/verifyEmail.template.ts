export const verificationEmailTemplate = (verificationUrl: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="padding:32px;background:#f8f9fa;border-bottom:1px solid #e0e0e0;">
                <h1 style="margin:0;color:#333333;font-size:18px;letter-spacing:2px;text-transform:uppercase;">
                  AI Battle ARENA
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 32px;">
                <h2 style="margin:0 0 12px;color:#333333;font-size:24px;">
                  Verify your email
                </h2>
                <p style="margin:0 0 32px;color:#666666;font-size:15px;line-height:1.6;">
                  You're one step away from accessing the AI Battle Arena.
                  Click the button below to verify your email address.
                  This link expires in <strong style="color:#333333;">24 hours</strong>.
                </p>

                <!-- CTA Button -->
                <a
                  href="${verificationUrl}"
                  style="
                    display:inline-block;
                    background:#007bff;
                    color:#ffffff;
                    text-decoration:none;
                    font-weight:bold;
                    font-size:13px;
                    letter-spacing:1px;
                    text-transform:uppercase;
                    padding:14px 32px;
                    border-radius:4px;
                  "
                >
                  VERIFY EMAIL
                </a>

                <p style="margin:32px 0 0;color:#999999;font-size:13px;">
                  If you didn't create an account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px;border-top:1px solid #e0e0e0;">
                <p style="margin:0;color:#999999;font-size:12px;letter-spacing:1px;">
                  © 2024 AI Battle INTELLIGENCE. ALL RIGHTS RESERVED.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;