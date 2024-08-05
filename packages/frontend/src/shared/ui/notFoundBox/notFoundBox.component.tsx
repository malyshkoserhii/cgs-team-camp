import { ReactElement } from 'react';
import {
	containerStyle,
	contentStyle,
	messageStyle,
	titleStyle,
} from './notFoundBox.styles';

type Props = {
	message?: string;
	withCode?: boolean;
};

export const NotFoundBox = ({
	message = 'Page Not Found',
	withCode = true,
}: Props): ReactElement => {
	return (
		<div className={containerStyle}>
			<div className={contentStyle}>
				{withCode && <h1 className={titleStyle}>404</h1>}
				<p className={messageStyle}>{message}</p>
			</div>
		</div>
	);
};
