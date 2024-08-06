import React from 'react';
import { NavLink } from 'react-router-dom';
import { linkStyle } from '~shared/components/StyledNavLink/StyledNavLink.styles';

interface StyledNavLinkProps {
	to: string;
	children: React.ReactNode;
}

export const StyledNavLink: React.FC<StyledNavLinkProps> = ({
	to,
	children,
}) => {
	return (
		<NavLink to={to} className={linkStyle}>
			{children}
		</NavLink>
	);
};
