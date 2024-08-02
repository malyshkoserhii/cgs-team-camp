import { ReactElement } from 'react';
import { ChangePasswordForm } from '~/components/changePasswordForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const ResetPasswordPage = (): ReactElement => {
	return (
		<PageWrapper center>
			<ChangePasswordForm firstStep />
		</PageWrapper>
	);
};

export default ResetPasswordPage;
