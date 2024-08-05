import { OptionI } from '~shared/interfaces/option.interface';

export enum FormVariantsEnum {
	Input = 'input',
	Select = 'select',
	Radio_Group = 'radio-group',
}

interface BaseFormOption {
	name?: string;
	id: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	placeholder?: string;
	withError?: boolean;
	maxWidth?: string;
	type?: string;
	min?: number;
	max?: number;
}

interface FormOptionVariantMapI {
	[FormVariantsEnum.Input]: {
		variant: FormVariantsEnum.Input;
	};
	[FormVariantsEnum.Radio_Group]: {
		variant: FormVariantsEnum.Radio_Group;
		options: OptionI[];
	};
	[FormVariantsEnum.Select]: {
		variant: FormVariantsEnum.Select;
		options: OptionI[];
	};
}

export type FormOption<T extends FormVariantsEnum> = BaseFormOption &
	FormOptionVariantMapI[T];
