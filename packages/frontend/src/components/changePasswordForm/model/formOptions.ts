import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';

export const optionsConfirm: FormOption<FormVariantsEnum>[] = [
	{
		id: 'password',
		variant: FormVariantsEnum.Input,
		name: 'Password',
		isRequired: true,
		placeholder: 'Write your password...',
		type: 'password',
	},
	{
		id: 'confirmPassword',
		variant: FormVariantsEnum.Input,
		name: 'Confirm password',
		isRequired: true,
		placeholder: 'Confirm your password...',
		type: 'password',
	},
];

export const optionsReset: FormOption<FormVariantsEnum>[] = [
	{
		id: 'email',
		variant: FormVariantsEnum.Input,
		name: 'Email',
		isRequired: true,
		placeholder: 'Write your email...',
	},
];
