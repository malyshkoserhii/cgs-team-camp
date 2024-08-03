import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from '~router/router';

const App: React.FunctionComponent = () => {
	console.log('App component rendered'); // Debug statement
	return (
		<Router>
			<div>
				<header>
					<h1>Todo Application</h1>
				</header>
				<main>
					<RouterComponent />
				</main>
				<footer>{}</footer>
			</div>
		</Router>
	);
};

export default App;
