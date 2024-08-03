import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

import {
	HeaderContainer,
	MainContainer,
} from '~shared/components/Layout/Layout.styles';

export const Layout: React.FC = () => {
	return (
		<>
			<header className={HeaderContainer}>
				<>
					<NavLink to={'/'}>Todo List</NavLink>
				</>
			</header>

			<main className={MainContainer}>
				<Outlet />
			</main>
			<footer></footer>
		</>
	);
};
