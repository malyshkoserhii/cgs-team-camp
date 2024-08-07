import React from 'react';
import { TodoContainer } from '~shared/components/todo/todo-container';
import { UserHeader } from '~shared/components/user/user-header';

const HomePageContainer: React.FunctionComponent = () => (
	<>
		<UserHeader />
		<TodoContainer />
	</>
);

export default HomePageContainer;
