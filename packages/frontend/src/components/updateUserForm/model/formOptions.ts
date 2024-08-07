import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';

export const optionsName: FormOption<FormVariantsEnum>[] = [
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Name',
		isRequired: true,
		placeholder: 'Write your new username...',
	},
];

export const optionsUpdatePassword: FormOption<FormVariantsEnum>[] = [
	{
		id: 'oldPassword',
		variant: FormVariantsEnum.Input,
		name: 'Old password',
		isRequired: true,
		placeholder: 'Write your old password...',
		type: 'password',
	},
	{
		id: 'password',
		variant: FormVariantsEnum.Input,
		name: 'New password',
		isRequired: true,
		placeholder: 'Write your new password...',
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
