import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	//@ts-expect-error ///
	service: 'gmail',
	host: process.env.DEV_SMTP_HOST,
	port: process.env.DEV_SMTP_PORT,
	secure: true,
	auth: {
		user: process.env.DEV_SMTP_USER,
		pass: process.env.DEV_SMTP_PASSWORD,
	},
});
export const mailService = {
	sendActivationEmail: async (to: string, link: string): Promise<void> => {
		try {
			await transporter.sendMail({
				from: process.env.DEV_SMTP_USER,
				to,
				subject: 'Account activation on the Task manager',
				text: '',
				html: `
                <div>
                <h1>Activation link</h1>
                <a href="${link}">${link}</a>
                </div>
                `,
			});
		} catch (e) {
			console.log(e);
		}
	},
};
