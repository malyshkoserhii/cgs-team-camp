import { ReactElement } from 'react';
import { ChangePasswordForm } from '~/components/changePasswordForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const ResetPasswordConfirmPage = (): ReactElement => {
	return (
		<PageWrapper center>
			<ChangePasswordForm />
		</PageWrapper>
	);
};

export default ResetPasswordConfirmPage;
