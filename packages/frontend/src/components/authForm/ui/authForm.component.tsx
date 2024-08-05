import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { loginSchemaResolver } from '~shared/joiSchemas/joiSchemas/user/loginSchema';
import { userSchemaResolver } from '~shared/joiSchemas/joiSchemas/user/user.schema';
import { UserFormModel } from '~shared/models/user.model';
import { Form } from '~shared/ui/form';
import { useUserStore } from '~store/user.store';
import { optionsLogin, optionsRegister } from '../model/formOptions';
import {
	forgotLinkStyle,
	formButtonStyle,
	formContainerStyle,
} from './authForm.styles';

type Props = {
	isLogin?: boolean;
};

export const AuthForm = ({ isLogin }: Props): ReactElement => {
	const { login, register, registerLoading, loginLoading } = useUserStore();
	const navigate = useNavigate();

	const changePage = (): void => {
		return isLogin
			? navigate(ROUTER_KEYS.REGISTER)
			: navigate(ROUTER_KEYS.LOGIN);
	};

	const onSubmit = async (data: UserFormModel): Promise<void> => {
		if (isLogin) {
			await login(data, navigate);
		} else {
			await register(data);
		}
	};

	return (
		<div className={formContainerStyle}>
			<Form<UserFormModel>
				variant="noStyle"
				heading={
					isLogin ? 'Login to your account' : 'Register your account'
				}
				options={isLogin ? optionsLogin : optionsRegister}
				defaultValues={
					isLogin
						? ({ email: '', password: '' } as UserFormModel)
						: new UserFormModel()
				}
				formValidationSchema={
					isLogin ? loginSchemaResolver : userSchemaResolver
				}
				onSubmit={onSubmit}
				isLoading={registerLoading || loginLoading}
				content={
					isLogin && (
						<a
							onClick={() =>
								navigate(ROUTER_KEYS.CHANGE_PASSWORD)
							}
							className={forgotLinkStyle}
						>
							Forgot your password?
						</a>
					)
				}
			/>

			<a onClick={changePage} className={formButtonStyle}>
				{isLogin
					? 'Don`t have an account? Sign up'
					: 'Already have an account? Sign in'}
			</a>
		</div>
	);
};
