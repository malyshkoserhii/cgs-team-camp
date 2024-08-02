import { ReactElement } from 'react';
import { AuthForm } from '~/components/authForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const RegisterPage = (): ReactElement => {
	return (
		<PageWrapper center>
			<AuthForm />
		</PageWrapper>
	);
};

export default RegisterPage;
