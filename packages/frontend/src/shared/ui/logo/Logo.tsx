import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import logo from '../../../../public/logoFull.jpg';
import { Image } from '../image';

export const Logo = (): ReactElement => {
	return (
		<NavLink to={ROUTER_KEYS.DASHBOARD}>
			<Image src={logo} width="100px" alt="Logo" />
		</NavLink>
	);
};
