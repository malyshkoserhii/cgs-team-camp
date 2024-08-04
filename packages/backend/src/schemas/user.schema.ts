import Joi from 'joi';

import { joiErrorMessages, REGEX } from '@/constants';

export const userSchema = Joi.object()
	.keys({
		email: Joi.string()
			.email()
			.required()
			.messages(joiErrorMessages.string('User name')),
		password: Joi.string()
			.pattern(REGEX.PASSWORD)
			.required()
			.messages(joiErrorMessages.string('Password'))
			.messages(joiErrorMessages.passwordPattern()),
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(255)
			.required()
			.messages(joiErrorMessages.string('User name')),
	})
	.min(1)
	.messages(joiErrorMessages.objMin());
