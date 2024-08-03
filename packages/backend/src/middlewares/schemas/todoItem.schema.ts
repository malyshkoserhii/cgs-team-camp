import { checkSchema } from 'express-validator';

export const todoItemCreateSchema = checkSchema({
	name: {
		in: ['body'],
		isString: {
			errorMessage: 'Name must be a string',
		},
		notEmpty: {
			errorMessage: 'Name is required',
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
	status: {
		in: ['body'],
		isString: {
			errorMessage: 'Status must be a string',
		},
		optional: {
			options: { checkFalsy: true },
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
	dashboardId: {
		in: ['body'],
		isInt: {
			errorMessage: 'Dashboard ID must be an integer',
		},
		toInt: true,
	},
});

export const todoItemUpdateSchema = checkSchema({
	name: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isString: {
			errorMessage: 'Name must be a string',
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
	status: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isString: {
			errorMessage: 'Status must be a string',
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
	dashboardId: {
		in: ['body'],
		optional: {
			options: { checkFalsy: true },
		},
		isInt: {
			errorMessage: 'Dashboard ID must be an integer',
		},
		toInt: true,
	},
});
