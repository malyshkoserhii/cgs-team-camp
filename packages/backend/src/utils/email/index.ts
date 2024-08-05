import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

const sendEmail = async (
	email: string,
	subject: string,
	payload: { name: string; link: string },
	source: string,
): Promise<{ success: boolean }> => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const compiledTemplate = handlebars.compile(source);
		const options = (): nodemailer.SendMailOptions => ({
			from: 'TODO ONLINE',
			to: email,
			subject,
			html: compiledTemplate(payload),
		});

		await transporter.sendMail(options());

		return { success: true };
	} catch (error) {
		return { success: false };
	}
};

export default sendEmail;
