import {
	privacyOptionsWithAll,
	statusOptionsWithAll,
} from '~shared/const/options.const';
import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';

export const filterOptionsWithAuth: FormOption<FormVariantsEnum>[] = [
	{
		id: 'status',
		variant: FormVariantsEnum.Select,
		name: 'By status',
		isRequired: false,
		options: statusOptionsWithAll,
		withError: false,
	},
	{
		id: 'isPrivate',
		variant: FormVariantsEnum.Radio_Group,
		name: 'By privacy',
		isRequired: false,
		options: privacyOptionsWithAll,
		withError: false,
	},
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Search by title',
		isRequired: false,
		placeholder: 'Search by title...',
		withError: false,
	},
];

export const filterOptions: FormOption<FormVariantsEnum>[] = [
	{
		id: 'status',
		variant: FormVariantsEnum.Select,
		name: 'By status',
		isRequired: false,
		options: statusOptionsWithAll,
		withError: false,
	},
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Search by title',
		isRequired: false,
		placeholder: 'Search by title...',
		withError: false,
	},
];
