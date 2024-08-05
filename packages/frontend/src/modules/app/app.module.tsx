import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from '~router/router';
import {
	appContainerStyles,
	headerStyles,
	mainStyles,
	titleStyles,
} from './App.styles';

const App: React.FunctionComponent = () => {
	return (
		<Router>
			<div className={appContainerStyles}>
				<header className={headerStyles}>
					<h1 className={titleStyles}>Todo Application</h1>
				</header>
				<main className={mainStyles}>
					<RouterComponent />
				</main>
			</div>
		</Router>
	);
};

export default App;
