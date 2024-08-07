import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { contentStyles } from './AuthorizedLayout.styles';
import { Popover, Menu, Button, Alignment, Navbar } from '@blueprintjs/core';
import { useUserStore } from '~store/user.store';

const AuthorizedLayout: React.FC = () => {
	const { logOut } = useUserStore();
	const navigator = useNavigate();
	return (
		<>
			<Navbar>
				<Navbar.Group align={Alignment.LEFT}>
					<Button
						className="bp5-minimal justify-between"
						onClick={() => navigator(ROUTER_KEYS.TODO)}
						icon="home"
						text="Todos"
					/>
					<Button
						className="bp5-minimal"
						onClick={() => navigator(ROUTER_KEYS.NEW)}
						icon="add"
						text="New Todo"
					/>
				</Navbar.Group>
				<div className="bp5-navbar-group bp5-align-right">
					<Popover
						content={
							<Menu>
								<li>
									<NavLink
										className="bp5-menu-item"
										tabIndex={0}
										to={ROUTER_KEYS.CHANGE_NAME}
									>
										Change Name
									</NavLink>
								</li>
								<li>
									<NavLink
										className="bp5-menu-item"
										tabIndex={0}
										to={ROUTER_KEYS.CHANGE_PASSWORD}
									>
										Change Password
									</NavLink>
								</li>
								<li className="bp5-menu-divider"></li>
								<li>
									<NavLink
										className="bp5-menu-item bp5-intent-danger"
										tabIndex={0}
										to={ROUTER_KEYS.LOGIN}
										onClick={() => logOut()}
									>
										Log Out
									</NavLink>
								</li>
							</Menu>
						}
						placement="bottom"
					>
						<Button
							alignText="left"
							icon="person"
							rightIcon="caret-down"
							text="Profile"
						/>
					</Popover>
				</div>
			</Navbar>
			<div className={contentStyles}>
				<Outlet />
			</div>
		</>
	);
};

export default AuthorizedLayout;
