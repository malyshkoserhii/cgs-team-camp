import { cx } from '@emotion/css';
import {
	InputHTMLAttributes,
	memo,
	ReactElement,
	ReactNode,
	useState,
} from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
	asteriskStyle,
	boxStyle,
	emptyMessageStyle,
	labelStyle,
} from '~shared/styles/formComponentBase.styles';
import { Flex } from '../base/flex';
import { Text } from '../base/text';
import Button from '../button/button.component';
import { addonStyle, inputStyle, inputWrapperStyle } from './input.styles';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
	className?: string;
	name?: string;
	isRequired?: boolean;
	autofocus?: boolean;
	readonly?: boolean;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
	size?: InputSize;
	control?: unknown;
	maxWidth: string;
	withError: boolean;
}

export const Input = memo(
	<T extends FieldValues>(props: InputProps): ReactElement => {
		const {
			id,
			className,
			name,
			type = 'text',
			isRequired,
			placeholder,
			readonly,
			addonLeft,
			addonRight,
			size = 'm',
			control,
			maxWidth,
			withError = true,
			...otherProps
		} = props;
		const [showPassword, setShowPassword] = useState<boolean>(false);
		let passwordAddon;

		const onClickShowPassword = (): void => {
			setShowPassword((prev) => !prev);
		};

		if (type === 'password') {
			passwordAddon = (
				<Button
					variant="clear"
					onClick={onClickShowPassword}
					icon={showPassword ? 'eye-open' : 'lock'}
				/>
			);
		}

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
							className={cx(
								inputWrapperStyle(maxWidth),
								className,
								size,
								{
									readonly,
									withAddonLeft: Boolean(addonLeft),
									withAddonRight: Boolean(
										passwordAddon || addonRight,
									),
								},
								emptyMessageStyle,
							)}
						>
							<div className={addonStyle}>{addonLeft}</div>
							<input
								ref={ref}
								type={showPassword ? 'text' : type}
								value={value || ''}
								onChange={onChange}
								className={inputStyle}
								readOnly={readonly}
								placeholder={placeholder}
								{...otherProps}
							/>
							<div className={addonStyle}>
								{passwordAddon || addonRight}
							</div>
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
	},
);
