import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyles } from './navBar.styles';

interface IConfig {
	path: string;
	title: string;
}

interface INavBar {
	config: IConfig[];
}

const NavBar = ({ config }: INavBar): React.ReactNode => {
	return (
		<nav className={navBarStyles}>
			{config.map((rout) => (
				<Link key={rout.path} to={rout.path}>
					{rout.title}
				</Link>
			))}
		</nav>
	);
};

export default NavBar;
