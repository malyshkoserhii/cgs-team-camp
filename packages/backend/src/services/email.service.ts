import nodemailer from 'nodemailer';

// Configure the email transporter
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER, // SMTP username
		pass: process.env.SMTP_PASS, // SMTP password
	},
});

const fromAddress = process.env.FROM_EMAIL || 'noreply@example.com';

// Function to send verification email
export const sendVerificationEmail = async (
	to: string,
	token: string,
): Promise<void> => {
	const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

	const mailOptions = {
		from: fromAddress,
		to,
		subject: 'Verify your email',
		text: `Please verify your email by clicking the following link: ${verificationUrl}`,
		html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Verification email sent');
	} catch (error) {
		console.error('Error sending verification email', error);
	}
};

// Function to send reset password email
export const sendResetPasswordEmail = async (
	to: string,
	token: string,
): Promise<void> => {
	const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

	const mailOptions = {
		from: fromAddress,
		to,
		subject: 'Reset your password',
		text: `You can reset your password by clicking the following link: ${resetUrl}`,
		html: `<p>You can reset your password by clicking the following link: <a href="${resetUrl}">${resetUrl}</a></p>`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Reset password email sent');
	} catch (error) {
		console.error('Error sending reset password email', error);
	}
};
