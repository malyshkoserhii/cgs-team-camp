import { ReactElement } from 'react';
import { TodoForm } from '~/components/todoForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const CreateTodoPage = (): ReactElement => {
	return (
		<PageWrapper>
			<TodoForm />
		</PageWrapper>
	);
};

export default CreateTodoPage;
