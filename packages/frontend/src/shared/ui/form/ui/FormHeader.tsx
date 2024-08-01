import { ReactElement } from 'react';
import { Heading } from '~shared/ui/base/heading';

type Props = {
	heading: string;
};

export const FormHeader = ({ heading }: Props): ReactElement => {
	return <Heading level={2}>{heading}</Heading>;
};
