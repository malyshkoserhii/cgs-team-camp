import { checkSchema } from 'express-validator';

export const dashboardCreateSchema = checkSchema({
	name: {
		in: ['body'],
		isString: {
			errorMessage: 'Name must be a string',
		},
		notEmpty: {
			errorMessage: 'Name is required',
		},
	},
	ownername: {
		in: ['body'],
		isString: {
			errorMessage: 'Owner name must be a string',
		},
		notEmpty: {
			errorMessage: 'Owner name is required',
		},
	},
	date: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isISO8601: {
			errorMessage: 'Date must be a valid ISO8601 date string',
		},
		toDate: true,
	},
	descr: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isString: {
			errorMessage: 'Description must be a string',
		},
	},
	private: {
		in: ['body'],
		isBoolean: {
			errorMessage: 'Private must be a boolean value',
		},
	},
});

export const dashboardUpdateSchema = checkSchema({
	name: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isString: {
			errorMessage: 'Name must be a string',
		},
	},
	descr: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isString: {
			errorMessage: 'Description must be a string',
		},
	},
	date: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isISO8601: {
			errorMessage: 'Date must be a valid ISO8601 date string',
		},
		toDate: true,
	},
	private: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isBoolean: {
			errorMessage: 'Private must be a boolean value',
		},
	},
});
