import * as React from 'react';
import { Alert } from '~shared/ui/alert';
import { Container } from '~shared/ui/container';
import { Modal } from '~shared/ui/modal/modal.component';
import { Navbar } from '~shared/ui/navbar';
import { AppRouter } from './providers/AppRouter/AppRouter';

const App = (): React.ReactElement => {
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
