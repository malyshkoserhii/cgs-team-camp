import * as React from 'react';
import classNames from 'classnames';

import { btnContentWrapper, btnStyles, iconWrapper, mr } from './button.styles';
import { Loader } from '~shared/components';

type IButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	extraButtonStyles?: string;
	icon?: React.ReactNode;
};

export const Button: React.FunctionComponent<IButtonProps> = ({
	text,
	type = 'submit',
	onClick,
	loading,
	disabled,
	extraButtonStyles,
	icon,
}) => {
	const isDisabled = Boolean(loading ?? disabled);

	const handleClick = (): void => {
		if (isDisabled) {
			return;
		}

		onClick?.();
	};

	return (
		<button
			disabled={isDisabled}
			type={type}
			onClick={handleClick}
			className={classNames(
				btnStyles(Boolean(disabled)),
				extraButtonStyles,
			)}
		>
			{Boolean(loading) ? (
				<Loader loading={loading} />
			) : (
				<span className={btnContentWrapper}>
					{icon && (
						<span
							className={classNames(iconWrapper, {
								[mr]: Boolean(text),
							})}
						>
							{icon}
						</span>
					)}
					{text}
				</span>
			)}
		</button>
	);
};
