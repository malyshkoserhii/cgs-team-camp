import forgotPasswordEmail from '@/email/forgotPasswordEmail';
import verificationEmail from '@/email/verivicationEmail';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';

const { FRONTEND_URL, SENDGRID_API_KEY_NEW, SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY_NEW!);

export default class MailService {
	async sendVerificationEmail(
		to: string,
		vericationCode: string,
	): Promise<void> {
		const email = {
			to,
			from: SENDER_EMAIL!,
			subject: 'Verify your email',
			html: verificationEmail(vericationCode, FRONTEND_URL!),
		};

		await sgMail.send(email);
	}

	async sendFogotPassworEmail(
		to: string,
		vericationCode: string,
	): Promise<void> {
		const email = {
			to,
			from: SENDER_EMAIL!,
			subject: 'Reset password',
			html: forgotPasswordEmail(vericationCode, FRONTEND_URL!),
		};

		await sgMail.send(email);
	}
}
