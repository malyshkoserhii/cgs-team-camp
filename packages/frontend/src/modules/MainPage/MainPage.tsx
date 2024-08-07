import React from 'react';
import { container } from '~modules/MainPage/MainPage.styles';
import { StyledNavLink } from '~shared/components';
import { ROUTER_KEYS } from '~shared/keys';

export const MainPage: React.FC = () => {
	return (
		<div className={container}>
			<h1>Todo app</h1>
			<StyledNavLink to={ROUTER_KEYS.LOGIN}>Login</StyledNavLink>
			<StyledNavLink to={ROUTER_KEYS.REGISTER}>
				Registration
			</StyledNavLink>
			<StyledNavLink to={ROUTER_KEYS.FORGET_PSW}>
				Forget password?
			</StyledNavLink>
		</div>
	);
};
