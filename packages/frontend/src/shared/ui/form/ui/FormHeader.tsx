import { css } from '@emotion/css';
import { ReactElement } from 'react';
import { Heading } from '~shared/ui/base/heading';

type Props = {
	heading: string;
};

const style = css`
	margin-bottom: 20px;
`;

export const FormHeader = ({ heading }: Props): ReactElement => {
	return (
		<Heading className={style} level={2}>
			{heading}
		</Heading>
	);
};
