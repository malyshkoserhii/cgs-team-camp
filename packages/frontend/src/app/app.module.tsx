import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QUERY_PARAMS_KEYS } from '~shared/const/keys.const';
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
	const [searchParams, setSearchParams] = useSearchParams();
	const { token, currentLoading } = useAuth();

	useEffect(() => {
		if (token) {
			currentUser();
		}
		if (searchParams.get(QUERY_PARAMS_KEYS.SHOW_MORE)) {
			searchParams.delete(QUERY_PARAMS_KEYS.SHOW_MORE);
			searchParams.delete(QUERY_PARAMS_KEYS.PAGE);
			setSearchParams(searchParams);
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
