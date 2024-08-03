import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from '~shared/components/Layout/Layout';

const App = (): React.ReactNode => {
	return (
		<>
			<Layout />
			<ToastContainer />
		</>
	);
};

export default App;
