import { IconName, MaybeElement } from '@blueprintjs/core';
import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { breakpoints } from '~shared/styles/breakpoints';
import { Flex } from '../base/flex';
import { Text } from '../base/text';
import Button from '../button/button.component';
import { Logo } from '../logo/Logo';
import { Menu } from '../menu';
import { navbarStyle } from './navbar.styles';

interface NavOption {
	to: string;
	icon: MaybeElement | IconName;
	text?: string;
	authRequired?: boolean;
	hideOnSmallScreen?: boolean;
}

const navOptions: NavOption[] = [
	{ to: ROUTER_KEYS.LOGIN, icon: 'log-in', authRequired: false },
	{
		to: ROUTER_KEYS.CREATE_TODO,
		icon: 'edit',
		text: 'Create',
		authRequired: true,
		hideOnSmallScreen: true,
	},
];

export const Navbar = (): ReactElement => {
	const { isAuth, user } = useAuth();
	const isMobileAndTablet = useMediaQuery({
		query: `(max-width: ${breakpoints.lg})`,
	});

	return (
		<header className={navbarStyle}>
			<Logo />
			<Flex gap="10px">
				{isAuth && <Text>Welcome, {user.name}!</Text>}
				<Link to={ROUTER_KEYS.DASHBOARD}>
					<Button icon="home" text="Home" />
				</Link>
				{navOptions.map((option, index) => {
					if (isMobileAndTablet && option.hideOnSmallScreen) {
						return null;
					}
					if (
						option.authRequired === undefined ||
						option.authRequired === isAuth
					) {
						return (
							<Link key={index} to={option.to}>
								<Button icon={option.icon} text={option.text} />
							</Link>
						);
					}

					return null;
				})}
				{isAuth && <Menu />}
			</Flex>
		</header>
	);
};
