import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header/header.component';
import { layoutStyles } from './layout.styles';

const Layout: FC = () => {
	return (
		<>
			<Header />
			<main className={layoutStyles()}>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
