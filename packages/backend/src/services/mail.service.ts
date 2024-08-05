import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY as string);

export class MailService {
	async sendVerificationEmail(to: string, token: string): Promise<void> {
		const verificationUrl = `${BASE_URL}/verify-email?token=${token}`;
		const msg = {
			to,
			from: SENDGRID_EMAIL_FROM as string,
			subject: 'Email verify instruction',
			html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Verify Your Email</h2>
                    <p>Thank you for registering. Please verify your email by clicking the button below:</p>
                    <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    <p>If the button above does not work, please copy and paste the following URL into your browser:</p>
                    <p><a href="${verificationUrl}">${verificationUrl}</a></p>
                    <p>Thank you!</p>
                </div>
            `,
		};

		await sgMail.send(msg);
	}
}
