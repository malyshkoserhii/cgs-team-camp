import { Radio, RadioGroup as BlueprintRadioGroup } from '@blueprintjs/core';
import { cx } from '@emotion/css';
import { ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
	asteriskStyle,
	boxStyle,
	emptyMessageStyle,
	labelStyle,
} from '~shared/styles/formComponentBase.styles';
import { Flex } from '../base/flex';
import { Text } from '../base/text';
import { radioGroupWrapperStyle } from './radioGroup.styles';

interface RadioGroupProps {
	id?: string;
	name?: string;
	isRequired?: boolean;
	control?: unknown;
	options: { label: string; value: string }[];
}

export const RadioGroup = <T extends FieldValues>({
	id,
	name,
	isRequired,
	control,
	options,
}: RadioGroupProps): ReactElement => {
	return (
		<Controller
			name={id as Path<T>}
			control={control as Control<T>}
			render={({
				field: { onChange, value, ref },
				fieldState: { error },
			}) => (
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
						className={cx(radioGroupWrapperStyle, {
							error: Boolean(error),
						})}
					>
						<BlueprintRadioGroup
							onChange={onChange}
							selectedValue={value}
							ref={ref}
						>
							{options.map(({ label, value }) => (
								<Radio
									key={value}
									label={label}
									value={value}
								/>
							))}
						</BlueprintRadioGroup>
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
