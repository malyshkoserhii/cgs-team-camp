import { ReactElement, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { Heading } from '~shared/ui/base/heading';
import Button from '~shared/ui/button/button.component';
import { Loader } from '~shared/ui/loader';
import { PageWrapper } from '~shared/ui/pageWrapper';
import { useUserStore } from '~store/user.store';
import {
	activatePageBoxStyle,
	activatePageStyle,
	messageStyle,
} from './ActivePage.styles';

const ActivatePage = (): ReactElement => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const navigate = useNavigate();
	const { loading, registerConfirmation, error } = useUserStore();

	useEffect(() => {
		if (token) {
			registerConfirmation(token);
		}
	}, [token, registerConfirmation]);

	return (
		<PageWrapper>
			<div className={activatePageStyle}>
				<div className={activatePageBoxStyle}>
					{loading ? (
						<Loader />
					) : (
						<Heading className={messageStyle}>
							Your account has been activated!
						</Heading>
					)}
					<Button onClick={() => navigate(ROUTER_KEYS.LOGIN)}>
						Login
					</Button>
				</div>
			</div>
			{(!token || error) && <Navigate to={ROUTER_KEYS.REGISTER} />}
		</PageWrapper>
	);
};

export default ActivatePage;
