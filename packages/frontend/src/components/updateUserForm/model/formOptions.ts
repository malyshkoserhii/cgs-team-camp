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
