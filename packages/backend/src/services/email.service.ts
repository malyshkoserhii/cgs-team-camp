import nodemailer from 'nodemailer';
import crypto from 'crypto';

export function generateActivationToken(): string {
	return crypto.randomBytes(32).toString('hex');
}

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
} as nodemailer.TransportOptions);

export const mailService = {
	sendActivationEmail: async (to: string, link: string): Promise<void> => {
		try {
			await transporter.sendMail({
				from: process.env.SMTP_USER,
				to,
				subject: 'Account activation',
				html: `
          <h1>Account activation</h1>
          <a href="${link}">${link}</a>
        `,
			});
		} catch (e) {
			console.log(e);
		}
	},

	sendPasswordResetEmail: async (to: string, link: string): Promise<void> => {
		try {
			await transporter.sendMail({
				from: process.env.SMTP_USER,
				to,
				subject: 'Password Reset Request',
				html: `
          <h1>Password Reset</h1>
          <a href="${link}">${link}</a>
        `,
			});
		} catch (e) {
			console.log(e);
		}
	},
};
