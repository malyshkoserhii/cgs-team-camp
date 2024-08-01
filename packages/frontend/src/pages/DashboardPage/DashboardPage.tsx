import { ReactElement } from 'react';
import { TodoList } from '~/components/todoList/ui/todoList.component';
import { PageWrapper } from '~shared/ui/pageWrapper';

const DashboardPage = (): ReactElement => {
	return (
		<PageWrapper>
			<TodoList />
		</PageWrapper>
	);
};

export default DashboardPage;
