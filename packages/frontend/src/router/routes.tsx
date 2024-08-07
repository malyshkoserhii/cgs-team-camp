import React from 'react';
import { ROUTER_KEYS } from '~shared/keys';

const LoginPage = React.lazy(() =>
	import('~modules/app/pages/LoginPage/LoginPage').then((module) => ({
		default: module.LoginPage,
	})),
);
const SignupPage = React.lazy(() =>
	import('~modules/app/pages/SignupPage/SignupPage').then((module) => ({
		default: module.SignupPage,
	})),
);
const VerificationPage = React.lazy(() =>
	import('~modules/app/pages/VerificationPage/VerificationPage').then(
		(module) => ({
			default: module.VerificationPage,
		}),
	),
);
const ChangePasswordPage = React.lazy(() =>
	import('~modules/app/pages/ChangePasswordPage/ChangePasswordPage').then(
		(module) => ({
			default: module.ChangePasswordPage,
		}),
	),
);
const EditNamePage = React.lazy(() =>
	import('~modules/app/pages/EditNamePage/EditNamePage').then((module) => ({
		default: module.EditNamePage,
	})),
);
const TodosPage = React.lazy(() =>
	import('~modules/app/pages/TodosPage/TodosPage').then((module) => ({
		default: module.TodosPage,
	})),
);
const NewTodoPage = React.lazy(() =>
	import('~modules/app/pages/NewTodoPage/NewTodoPage').then((module) => ({
		default: module.NewTodoPage,
	})),
);
const EditTodoPage = React.lazy(() =>
	import('~modules/app/pages/EditTodoPage/EditTodoPage').then((module) => ({
		default: module.EditTodoPage,
	})),
);
const ForgotPasswordPage = React.lazy(() =>
	import('~modules/app/pages/ForgotPasswordPage/ForgotPasswordPage').then(
		(module) => ({
			default: module.ForgotPasswordPage,
		}),
	),
);
const ResetPasswordPage = React.lazy(() =>
	import('~modules/app/pages/ResetPasswordPage/ResetPasswordPage').then(
		(module) => ({
			default: module.ResetPasswordPage,
		}),
	),
);

export const publicRoutes = [
	{
		path: ROUTER_KEYS.LOGIN,
		element: <LoginPage />,
	},
	{
		path: ROUTER_KEYS.SIGNUP,
		element: <SignupPage />,
	},
	{
		path: ROUTER_KEYS.VERIFY,
		element: <VerificationPage />,
	},
	{
		path: ROUTER_KEYS.FORGOT_PASSWORD,
		element: <ForgotPasswordPage />,
	},
	{
		path: ROUTER_KEYS.RESET_PASSWORD,
		element: <ResetPasswordPage />,
	},
];

export const privateRoutes = [
	{
		path: ROUTER_KEYS.TODO,
		element: <TodosPage />,
	},
	{
		path: ROUTER_KEYS.CHANGE_PASSWORD,
		element: <ChangePasswordPage />,
	},
	{
		path: ROUTER_KEYS.CHANGE_NAME,
		element: <EditNamePage />,
	},
	{
		path: ROUTER_KEYS.NEW,
		element: <NewTodoPage />,
	},
	{
		path: ROUTER_KEYS.EDIT,
		element: <EditTodoPage />,
	},
];
