import { ReactElement } from 'react';
import { Input } from '~shared/ui/input';
import { RadioGroup } from '~shared/ui/radioGroup/radioGroup.component';
import { Select } from '~shared/ui/select';
import { FormOption, FormVariantsEnum } from '../types/form.type';

type Props = {
	option: FormOption<FormVariantsEnum>;
	control: unknown;
};

export const renderFormBlock = ({ option, control }: Props): ReactElement => {
	switch (option.variant) {
		case FormVariantsEnum.Input:
			return <Input key={option.id} control={control} {...option} />;
		case FormVariantsEnum.Radio_Group:
			return <RadioGroup key={option.id} control={control} {...option} />;
		case FormVariantsEnum.Select:
			return <Select key={option.id} control={control} {...option} />;
	}
};
