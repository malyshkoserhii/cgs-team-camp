import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { HeaderContainer, MainContainer } from './layout.styles';

const Layout: React.FC = () => {
	return (
		<>
			<header className={HeaderContainer}>
				<>
					<NavLink to={ROUTER_KEYS.DASHBOARD}>Todo List</NavLink>
				</>
			</header>

			<main className={MainContainer}>
				<Outlet />
			</main>
			<footer></footer>
		</>
	);
};

export default Layout;
