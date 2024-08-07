import { ReactElement } from 'react';
import Button, { CustomButtonProps } from '~shared/ui/button/button.component';

type Props = CustomButtonProps & {
	active?: boolean;
};

export const PaginationButton = ({ active, ...props }: Props): ReactElement => {
	return (
		<Button
			fullWidth={false}
			variant={active ? 'filled' : 'outline'}
			{...props}
		/>
	);
};
