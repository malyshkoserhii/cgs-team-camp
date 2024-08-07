import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
	HeaderContainer,
	MainContainer,
	NavContainer,
} from '~shared/components/Layout/Layout.styles';
import { StyledNavLink } from '~shared/components';
import { ROUTER_KEYS } from '~shared/keys';
import { AuthService } from '~services/auth.service';
import { toast } from 'react-toastify';

const { verifyEmail } = new AuthService();

export const Layout: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const token = new URLSearchParams(location.search).get('token');

	useEffect(() => {
		const verifyEmailToken = async (): Promise<void> => {
			if (token) {
				try {
					const response = await verifyEmail(token);
					console.log('verifyEmailToken response:', response);
					// toast.success(response?.data?.message);
				} catch (err) {
					toast.error(
						err.response?.data?.message || 'Verification failed',
					);
				} finally {
					navigate(ROUTER_KEYS.MAIN);
				}
			}
		};

		verifyEmailToken();
	}, [token, navigate]);

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
