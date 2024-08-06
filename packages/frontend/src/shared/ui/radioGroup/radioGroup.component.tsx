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
import { radioGroupWrapperStyle, radioStyle } from './radioGroup.styles';

interface RadioGroupProps {
	id?: string;
	name?: string;
	isRequired?: boolean;
	control?: unknown;
	options: { label: string; value: string }[];
	row?: boolean;
	withError: boolean;
}

export const RadioGroup = <T extends FieldValues>({
	id,
	name,
	isRequired,
	row = true,
	control,
	options,
	withError = true,
}: RadioGroupProps): ReactElement => {
	return (
		<Controller
			name={id as Path<T>}
			control={control as Control<T>}
			render={({
				field: { onChange, value, ref },
				fieldState: { error },
			}) => (
				<div>
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
							inline={row}
							onChange={onChange}
							selectedValue={value}
							ref={ref}
						>
							{options.map(({ label, value }) => (
								<Radio
									key={value}
									label={label}
									value={value}
									className={radioStyle}
								/>
							))}
						</BlueprintRadioGroup>
					</div>
					{withError && (
						<div className={boxStyle}>
							<Text className={emptyMessageStyle}>
								{error?.message || ''}
							</Text>
						</div>
					)}
				</div>
			)}
		/>
	);
};
