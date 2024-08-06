import nodemailer from 'nodemailer';
import crypto from 'crypto';

export function generateActivationToken(): string {
	return crypto.randomBytes(32).toString('hex');
}

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	service: 'gmail',
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
} as nodemailer.TransportOptions);

export const mailService = {
	sendActivationEmail: async (
		email: string,
		token: string,
	): Promise<void> => {
		const verificationUrl = `${process.env.VERIFICATION_URL}/activate/${token}`;

		try {
			await transporter.sendMail({
				from: process.env.SMTP_USER,
				to: email,
				subject: 'Verify your account',
				html: `
                <h1>Account Verification</h1>
                <p>Please click the link below to verify your account:</p>
                <a href="${verificationUrl}">Verify Account ${verificationUrl}</a>
            `,
			});
			console.log('Verification email sent successfully');
		} catch (error) {
			console.error('Error sending verification email:', error);
			throw new Error('Failed to send verification email');
		}
	},

	sendPasswordResetEmail: async (
		email: string,
		token: string,
	): Promise<void> => {
		const resetUrl = `${process.env.REACT_APP_URL}/reset-password/${token}`;
		const mailOptions = {
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Password Reset Request',
			html: `
                <h1>Password Reset</h1>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
            `,
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log('Password reset email sent successfully');
		} catch (error) {
			console.error('Error sending password reset email:', error);
			throw new Error('Failed to send password reset email');
		}
	},
};
