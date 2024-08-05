import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({
	refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const accessToken = new Promise<string>((resolve, reject) => {
	oauth2Client.getAccessToken((err, token) => {
		if (err || !token) {
			reject('Failed to create access token');
		}
		resolve(token as string);
	});
});

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		user: process.env.EMAIL_USER,
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
		accessToken: accessToken,
	},
} as nodemailer.TransportOptions);

export const sendResetPasswordEmail = async (
	to: string,
	resetToken: string,
) => {
	const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

	await transporter.sendMail({
		from: `"Todo App" ${process.env.EMAIL_USER}`,
		to,
		subject: 'Password Reset Request',
		html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
	});
};

export const sendVerificationEmail = async (to: string, token: string) => {
	const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

	await transporter.sendMail({
		from: `"Your App Name" <${process.env.EMAIL_USER}>`,
		to,
		subject: 'Verify your email',
		html: `
		<p>Please click the link below to verify your email:</p>
		<a href="${verificationUrl}">${verificationUrl}</a>
	  `,
	});
};
