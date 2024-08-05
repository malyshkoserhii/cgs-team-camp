import forgotEmailHTMLTemplate from '@/emailTemplates/forgotEmailHTMLTemplate';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';
import VerifyEmailHTMLTemplate from '../emailTemplates/VerifyEmailHTMLTemplate';

const { SENDGRID_API_KEY, SENDER_EMAIL, FRONTEND_URL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY!);

export default class MailService {
	async sendVerificationEmail(
		to: string,
		verificationToken: string,
	): Promise<void> {
		const msg = {
			to,
			from: SENDER_EMAIL!,
			subject: 'Verify Your Email Address',
			html: VerifyEmailHTMLTemplate(verificationToken, FRONTEND_URL!),
		};

		await sgMail.send(msg);
	}

	async sendForgotPasswordEmail(
		to: string,
		verificationToken: string,
	): Promise<void> {
		const msg = {
			to,
			from: SENDER_EMAIL!,
			subject: 'Reset your password',
			html: forgotEmailHTMLTemplate(verificationToken, FRONTEND_URL!),
		};

		await sgMail.send(msg);
	}
}
