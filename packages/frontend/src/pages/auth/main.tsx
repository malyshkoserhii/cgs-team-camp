import React from 'react';
import { AuthForm, AuthFormProps } from '~shared/components/auth/form';

export interface AuthPageContainerProps {
	formikAuthFormProps: AuthFormProps;
}

const AuthPageContainer: React.FunctionComponent<AuthPageContainerProps> = ({
	formikAuthFormProps,
}) => <AuthForm {...formikAuthFormProps} />;

export default AuthPageContainer;
