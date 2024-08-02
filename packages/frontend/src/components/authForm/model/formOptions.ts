import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';

export const optionsRegister: FormOption<FormVariantsEnum>[] = [
	{
		id: 'email',
		variant: FormVariantsEnum.Input,
		name: 'Email',
		isRequired: true,
		placeholder: 'Write your email...',
	},
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Name',
		isRequired: true,
		placeholder: 'Write your name...',
	},
	{
		id: 'password',
		variant: FormVariantsEnum.Input,
		name: 'Password',
		isRequired: true,
		placeholder: 'Write your password...',
	},
];

export const optionsLogin: FormOption<FormVariantsEnum>[] = [
	{
		id: 'email',
		variant: FormVariantsEnum.Input,
		name: 'Email',
		isRequired: true,
		placeholder: 'Write your email...',
	},
	{
		id: 'password',
		variant: FormVariantsEnum.Input,
		name: 'Password',
		isRequired: true,
		placeholder: 'Write your password...',
	},
];
