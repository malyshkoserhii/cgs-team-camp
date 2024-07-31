import * as React from 'react';
import { Alert } from '~shared/components/alert';
import { Container } from '~shared/components/container';
import { Navbar } from '~shared/components/navbar';
import { AppRouter } from './providers/AppRouter/AppRouter';

const App = (): React.ReactElement => {
	return (
		<>
			<Navbar />
			<Container>
				<AppRouter />
			</Container>
			<Alert />
		</>
	);
};

export default App;
