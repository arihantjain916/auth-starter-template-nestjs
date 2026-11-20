import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

/**
 * Emails a one-time login code using the SMTP_* settings from .env.
 * Throws if SMTP isn't configured or the mail server rejects the message.
 */
export async function sendOtpEmail(
  config: ConfigService,
  email: string,
  otp: string,
): Promise<void> {
  const smtp = {
    host: config.get<string>('smtp.host'),
    port: config.getOrThrow<number>('smtp.port'),
    user: config.get<string>('smtp.user'),
    pass: config.get<string>('smtp.pass'),
    from: config.get<string>('smtp.from'),
  };
  if (!smtp.host || !smtp.from) {
    throw new Error('SMTP_HOST and SMTP_FROM must be set to send email');
  }
  const appName = config.getOrThrow<string>('appName');

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465, // true for 465, STARTTLS for 587
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
  });

  await transporter.sendMail({
    from: smtp.from,
    to: email,
    subject: `Your ${appName} login code`,
    text: `Your ${appName} login code is ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Your one-time code for <strong>${appName}</strong> is:</p>
        <h2 style="letter-spacing: 4px; color: #000;">${otp}</h2>
        <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
        <p>If you didn't request this code, you can ignore this email.</p>
      </div>
    `,
  });
}
