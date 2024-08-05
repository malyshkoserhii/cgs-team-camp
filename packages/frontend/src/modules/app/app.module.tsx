import React from 'react';
import { Link } from 'react-router-dom';
import { Global } from '@emotion/react';
import {
	globalStyles,
	appStyles,
	navStyles,
	linkStyles,
	contentStyles,
} from './app.styles';
import { ROUTER_KEYS } from '~shared/keys';

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
	return (
		<>
			<Global styles={globalStyles} />
			<div className={appStyles}>
				<nav className={navStyles}>
					<Link to={ROUTER_KEYS.ALL_MATCH} className={linkStyles}>
						Home
					</Link>
					<Link to={ROUTER_KEYS.TODO} className={linkStyles}>
						Todos
					</Link>
					<Link to={ROUTER_KEYS.NEW} className={linkStyles}>
						New Todo
					</Link>
				</nav>
				<div className={contentStyles}>{children}</div>
			</div>
		</>
	);
};

export default App;
