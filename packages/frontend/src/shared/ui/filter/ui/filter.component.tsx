import { cx } from '@emotion/css';
import { ReactElement, useCallback, useEffect } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { useDebouncedCallback } from '~shared/hooks/useDebouncedCallback.hook';
import { Flex } from '~shared/ui/base/flex';
import Button from '~shared/ui/button/button.component';
import { renderFormBlock } from '~shared/ui/form/model/renderFormBlock.service';
import { FormOption, FormVariantsEnum } from '~shared/ui/form/types/form.type';
import { useFilter } from '../model/useFilter.hook';
import { filterStyles } from './filter.styles';

interface Props<T> {
	options: FormOption<FormVariantsEnum>[];
	defaultValues: T;
	resetValues?: T;
	onChange?: () => void;
	resetPage?: boolean;
	resetOtherFilterKeys?: boolean;
	withResetButton?: boolean;
	values?: T;
}

export const Filter = <T extends FieldValues>({
	defaultValues,
	options,
	resetPage,
	withResetButton,
	resetValues,
	values,
}: Props<T>): ReactElement => {
	const { onUpdateFilter, onResetFilter } = useFilter();
	const { control, handleSubmit, watch, reset } = useForm<T>({
		defaultValues: defaultValues as DefaultValues<T>,
		values,
	});

	const onSubmit = useDebouncedCallback(
		useCallback(
			(data: T) => {
				onUpdateFilter(data);
			},
			[resetPage, onUpdateFilter],
		),
		500,
	);

	const resetFilter = useCallback((): void => {
		reset(resetValues);
		onResetFilter();
	}, [onResetFilter, reset, resetValues]);

	useEffect(() => {
		const subscription = watch((_, action) => {
			if (!action.type) return;
			return handleSubmit(onSubmit)();
		});
		return () => subscription.unsubscribe();
	}, [handleSubmit, onSubmit, watch]);

	return (
		<form className={cx(filterStyles)}>
			<Flex gap="10px" wrap="wrap">
				{options.map((option) => renderFormBlock({ option, control }))}
			</Flex>
			{withResetButton && (
				<Button
					fullWidth={false}
					onClick={resetFilter}
					rightIcon="reset"
					text="Reset"
				/>
			)}
		</form>
	);
};
