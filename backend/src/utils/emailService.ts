import nodemailer from 'nodemailer';
import { config } from '@/config';
import Logger from '@/config/logger';

const logger = Logger.getLogger('EmailService');

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: config.smtp.from,
        to,
        subject,
        html,
        text: text || html,
      });
      logger.info(`Email sent to ${to}`);
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <h1>Welcome to Road-Side Assistance!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for registering with us. We're excited to have you on board!</p>
      <p>Your account has been created and you can now enjoy our emergency roadside assistance services.</p>
      <p>Stay safe on the roads!</p>
    `;

    await this.sendEmail(email, 'Welcome to Road-Side Assistance', html);
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {
    const html = `
      <h2>Email Verification</h2>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await this.sendEmail(email, 'Verify Your Email', html);
  }

  async sendPasswordResetEmail(email: string, resetLink: string): Promise<void> {
    const html = `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await this.sendEmail(email, 'Reset Your Password', html);
  }
}

export const emailService = new EmailService();
export default EmailService;
