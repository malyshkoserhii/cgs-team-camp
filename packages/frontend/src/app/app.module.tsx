import { useEffect } from 'react';
import { STORAGE_KEYS } from '~shared/const/keys.const';
import { storageApi } from '~shared/services/storage/storage';
import { Alert } from '~shared/ui/alert';
import { Container } from '~shared/ui/container';
import { Modal } from '~shared/ui/modal/modal.component';
import { Navbar } from '~shared/ui/navbar';
import { useUserStore } from '~store/user.store';
import { AppRouter } from './providers/AppRouter/AppRouter';

const App = (): React.ReactElement => {
	const { currentUser } = useUserStore();

	useEffect(() => {
		if (storageApi.get(STORAGE_KEYS.TOKEN)) {
			currentUser();
		}
	}, []);

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
