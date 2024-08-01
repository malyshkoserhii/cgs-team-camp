import { ReactElement } from 'react';
import { useGetTodos } from '~shared/api/hooks/useGetTodos.hook';
import { TodoI } from '~shared/interfaces/todo.interface';
import { AppGrid } from '~shared/ui/grid';
import { PageWrapper } from '~shared/ui/pageWrapper';
import { TodoItem } from '~shared/ui/todo';

const DashboardPage = (): ReactElement => {
	const { data } = useGetTodos();

	return (
		<PageWrapper>
			<AppGrid<TodoI> items={data || []} renderItem={TodoItem} />
		</PageWrapper>
	);
};

export default DashboardPage;
