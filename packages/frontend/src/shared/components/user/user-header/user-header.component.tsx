import React, { useEffect } from 'react';
import { Button, HStack, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { UserHeaderStyled } from './user-header.styled';
import { useUserStore } from '~/state/store/user.store';
import { ROUTER_KEYS, STORAGE_KEYS } from '~shared/keys';

export const UserHeader: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const { data: user, getUser, setUser } = useUserStore();

	useEffect(() => {
		getUser();
	}, []);

	return (
		<UserHeaderStyled user={user}>
			{user ? (
				<HStack
					justifyContent={'space-between'}
					w={'100%'}
					padding={'0 1em'}
				>
					<Heading as="h1">{user.name}</Heading>
					<HStack>
						<Button
							colorScheme="red"
							onClick={() => {
								localStorage.removeItem(STORAGE_KEYS.TOKEN);
								setUser(null);
							}}
						>
							LOG OUT
						</Button>
					</HStack>
				</HStack>
			) : (
				<HStack>
					<Button
						colorScheme="green"
						onClick={() => navigate(ROUTER_KEYS.AUTH.LOGIN)}
					>
						LOGIN
					</Button>
					<Button
						colorScheme="green"
						variant={'outline'}
						onClick={() => navigate(ROUTER_KEYS.AUTH.SIGN_UP)}
					>
						SIGN UP
					</Button>
				</HStack>
			)}
		</UserHeaderStyled>
	);
};
