import { ReactElement } from 'react';
import { Flex } from '../base/flex';
import Button from '../button/button.component';
import { Logo } from '../logo/Logo';
import { navbarStyle } from './navbar.styles';

export const Navbar = (): ReactElement => {
	return (
		<header className={navbarStyle}>
			<Logo />
			<Flex gap="10px">
				<Button icon="home" text="Home" />
			</Flex>
		</header>
	);
};
