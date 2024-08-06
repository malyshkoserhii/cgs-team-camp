import { ReactElement } from 'react';
import { Text } from '../base/text';
import {
	containerStyle,
	contentStyle,
	messageStyle,
	titleStyle,
} from './notFoundBox.styles';

type Props = {
	message?: string;
	withCode?: boolean;
	fullHeight?: boolean;
};

export const NotFoundBox = ({
	message = 'Page Not Found',
	withCode = true,
	fullHeight = false,
}: Props): ReactElement => {
	return (
		<div className={containerStyle(fullHeight)}>
			<div className={contentStyle}>
				{withCode && <Text className={titleStyle}>404</Text>}
				<Text bold className={messageStyle}>
					{message}
				</Text>
			</div>
		</div>
	);
};
