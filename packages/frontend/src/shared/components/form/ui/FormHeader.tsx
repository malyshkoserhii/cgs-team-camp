import { ReactElement } from 'react';

type Props = {
	heading: string;
};

export const FormHeader = ({ heading }: Props): ReactElement => {
	return (
		<div>
			<p>{heading}</p>
		</div>
	);
};
