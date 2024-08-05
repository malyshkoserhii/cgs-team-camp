import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

export const sendVerificationEmail = async (
	email: string,
	token: string,
): Promise<void> => {
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: 'Verify your account',
		html: `
      <h1>Account Verification</h1>
      <p>Please click the link below to verify your account:</p>
      <a href="${process.env.VERIFICATION_URL}/${token}">Verify Account</a>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Verification email sent successfully');
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error('Failed to send verification email');
	}
};

export const sendPasswordResetEmail = async (
	email: string,
	token: string,
): Promise<void> => {
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: 'Reset your password',
		html: `
      <h1>Password Reset</h1>
      <p>You have requested to reset your password. Please click the link below to set a new password:</p>
      <a href="${process.env.PASSWORD_RESET_URL}/${token}">Reset Password</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Password reset email sent successfully');
	} catch (error) {
		console.error('Error sending password reset email:', error);
		throw new Error('Failed to send password reset email');
	}
};
