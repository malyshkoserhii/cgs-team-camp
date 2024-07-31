import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UserProfile from '~modules/UserProfile/UserProfile';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { useAuthStore } from '~store/Auth/auth.store';
import { HeaderContainer, MainContainer } from './layout.styles';

const Layout: React.FC = () => {
	const authStore = useAuthStore();
	const isLoggedIn = authStore.isLoggedIn;

	return (
		<>
			<header className={HeaderContainer}>
				{isLoggedIn ? (
					<>
						<NavLink to={ROUTER_KEYS.DASHBOARD}>Todo List</NavLink>
						<UserProfile />
					</>
				) : (
					<>
						<NavLink to={ROUTER_KEYS.REGISTER}>Register</NavLink>
						<NavLink to={ROUTER_KEYS.LOGIN}>Login</NavLink>
					</>
				)}
			</header>

			<main className={MainContainer}>
				<Outlet />
			</main>
			<footer></footer>
		</>
	);
};

export default Layout;
