import { useEffect } from 'react';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { Alert } from '~shared/ui/alert';
import { Container } from '~shared/ui/container';
import { Loader } from '~shared/ui/loader';
import { Modal } from '~shared/ui/modal/modal.component';
import { Navbar } from '~shared/ui/navbar';
import { useUserStore } from '~store/user.store';
import { AppRouter } from './providers/AppRouter/AppRouter';

const App = (): React.ReactElement => {
	const { currentUser } = useUserStore();
	const { token, currentLoading } = useAuth();

	useEffect(() => {
		if (token) {
			currentUser();
		}
	}, []);

	if (currentLoading) {
		return <Loader fullHeight />;
	}

	return (
		<>
			<Navbar />
			<Container>
				<AppRouter />
			</Container>
			<Alert />
			<Modal />
		</>
	);
};

export default App;
