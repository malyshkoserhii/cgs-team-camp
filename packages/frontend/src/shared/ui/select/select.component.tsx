import { MenuItem } from '@blueprintjs/core';
import { Select as BlueprintSelect, SelectProps } from '@blueprintjs/select';
import { cx } from '@emotion/css';
import { ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { OptionI } from '~shared/interfaces/option.interface';
import {
	asteriskStyle,
	boxStyle,
	emptyMessageStyle,
	labelStyle,
} from '~shared/styles/formComponentBase.styles';
import { Flex } from '../base/flex';
import { Text } from '../base/text';
import Button from '../button/button.component';

type Props = Omit<
	SelectProps<OptionI>,
	'items' | 'itemRenderer' | 'onItemSelect'
> & {
	id?: string;
	name?: string;
	isRequired?: boolean;
	control?: unknown;
	options: OptionI[];
};

export const Select = <T extends FieldValues>({
	id,
	name,
	isRequired,
	control,
	options,
	...otherProps
}: Props): ReactElement => {
	return (
		<Controller
			name={id as Path<T>}
			control={control as Control<T>}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<>
					{name && (
						<Flex justify="flex-start">
							<Text bold className={labelStyle}>
								{name}
							</Text>
							{isRequired && (
								<span className={asteriskStyle}>*</span>
							)}
						</Flex>
					)}
					<div
						className={cx('', {
							error: Boolean(error),
						})}
					>
						<BlueprintSelect
							items={options}
							itemRenderer={(
								item,
								{ handleClick, modifiers },
							) => (
								<MenuItem
									key={item.value}
									text={item.label}
									onClick={handleClick}
									active={modifiers.active}
									disabled={modifiers.disabled}
								/>
							)}
							onItemSelect={(item) => onChange(item.value)}
							filterable={false}
							{...otherProps}
						>
							<Button
								text={
									options?.find((el) => el.value === value)
										.label || options[0].label
								}
								variant="outline"
								rightIcon="double-caret-vertical"
							/>
						</BlueprintSelect>
					</div>
					<div className={boxStyle}>
						<Text className={emptyMessageStyle}>
							{error?.message || ''}
						</Text>
					</div>
				</>
			)}
		/>
	);
};
