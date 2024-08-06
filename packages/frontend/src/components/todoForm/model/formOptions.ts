import { privacyOptions, statusOptions } from '~shared/const/options.const';
import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';

export const options: FormOption<FormVariantsEnum>[] = [
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Name',
		isRequired: true,
		placeholder: 'Write task name...',
	},
	{
		id: 'description',
		variant: FormVariantsEnum.Input,
		name: 'Description',
		isRequired: true,
		placeholder: 'Write task description...',
	},
	{
		id: 'status',
		variant: FormVariantsEnum.Select,
		name: 'Status',
		isRequired: true,
		options: statusOptions,
	},
	{
		id: 'isPrivate',
		variant: FormVariantsEnum.Radio_Group,
		name: 'Privacy',
		isRequired: true,
		options: privacyOptions,
	},
];
