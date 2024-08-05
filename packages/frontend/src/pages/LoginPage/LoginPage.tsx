import { ReactElement } from 'react';
import { AuthForm } from '~/components/authForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const LoginPage = (): ReactElement => {
	return (
		<PageWrapper center>
			<AuthForm isLogin />
		</PageWrapper>
	);
};

export default LoginPage;
