import { privacyOptions, statusOptions } from '~shared/const/options.const';
import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';

export const filterOptions: FormOption<FormVariantsEnum>[] = [
	{
		id: 'status',
		variant: FormVariantsEnum.Select,
		name: 'Status',
		isRequired: false,
		options: statusOptions,
	},
	{
		id: 'isPrivate',
		variant: FormVariantsEnum.Radio_Group,
		name: 'Privacy',
		isRequired: false,
		options: privacyOptions,
	},
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Search',
		isRequired: false,
		placeholder: 'Search by title...',
	},
];
