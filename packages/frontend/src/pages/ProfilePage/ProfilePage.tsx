import { ReactElement } from 'react';
import { UpdateUserForm } from '~/components/updateUserForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const ProfilePage = (): ReactElement => {
	return (
		<PageWrapper center>
			<UpdateUserForm />
		</PageWrapper>
	);
};

export default ProfilePage;
