import {
	Menu as BluePrintMenu,
	MenuItem,
	Popover,
	Position,
} from '@blueprintjs/core';
import { cx } from '@emotion/css';
import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { breakpoints } from '~shared/styles/breakpoints';
import { useUserStore } from '~store/user.store';
import Button from '../button/button.component';
import { iconStyle, outlineButtonStyle } from '../button/button.styles';

export const Menu = (): ReactElement => {
	const navigate = useNavigate();
	const isMobileAndTablet = useMediaQuery({
		query: `(max-width: ${breakpoints.lg})`,
	});
	const { logout } = useUserStore();

	const menu = (
		<BluePrintMenu>
			<MenuItem
				icon="user"
				text="Your Profile"
				onClick={() => navigate(ROUTER_KEYS.PROFILE)}
			/>
			{isMobileAndTablet && (
				<MenuItem
					icon="edit"
					text="Create"
					onClick={() => navigate(ROUTER_KEYS.CREATE_TODO)}
				/>
			)}
			<MenuItem icon="log-out" text="Logout" onClick={logout} />
		</BluePrintMenu>
	);

	return (
		<Popover content={menu} position={Position.BOTTOM_RIGHT}>
			<Button
				variant="outline"
				icon="menu"
				className={cx(outlineButtonStyle, iconStyle)}
			/>
		</Popover>
	);
};
