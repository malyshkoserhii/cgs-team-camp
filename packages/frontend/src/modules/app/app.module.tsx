import React from 'react';
import { Global } from '@emotion/react';
import { globalStyles, appStyles } from './app.styles';

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
	return (
		<>
			<Global styles={globalStyles} />
			<div className={appStyles}>{children}</div>
		</>
	);
};

export default App;
