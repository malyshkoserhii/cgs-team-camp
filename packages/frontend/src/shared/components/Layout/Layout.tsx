import React from 'react';
import { Outlet } from 'react-router-dom';

import {
	HeaderContainer,
	MainContainer,
	NavContainer,
} from '~shared/components/Layout/Layout.styles';
import { StyledNavLink } from '~shared/components';
import { ROUTER_KEYS } from '~shared/keys';

export const Layout: React.FC = () => {
	return (
		<>
			<header className={HeaderContainer}>
				<nav className={NavContainer}>
					<StyledNavLink to={ROUTER_KEYS.DASHBOARD}>
						Todo List
					</StyledNavLink>
					<StyledNavLink to={ROUTER_KEYS.PROFILE}>
						Profile
					</StyledNavLink>
				</nav>
			</header>

			<main className={MainContainer}>
				<Outlet />
			</main>
			<footer></footer>
		</>
	);
};
