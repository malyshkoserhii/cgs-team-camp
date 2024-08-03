import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { Flex } from '../base/flex';
import Button from '../button/button.component';
import { Logo } from '../logo/Logo';
import { navbarStyle } from './navbar.styles';

export const Navbar = (): ReactElement => {
	const { isAuth } = useAuth();

	return (
		<header className={navbarStyle}>
			<Logo />
			<Flex gap="10px">
				{isAuth && (
					<Link to={ROUTER_KEYS.CREATE_TODO}>
						<Button icon="edit" text="Create" />
					</Link>
				)}
				<Link to={ROUTER_KEYS.DASHBOARD}>
					<Button icon="home" text="Home" />
				</Link>
			</Flex>
		</header>
	);
};
