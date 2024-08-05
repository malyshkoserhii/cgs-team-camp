import { ReactElement } from 'react';
import { TodoForm } from '~/components/todoForm';
import { PageWrapper } from '~shared/ui/pageWrapper';

const CreateTodoPage = (): ReactElement => {
	return (
		<PageWrapper center>
			<TodoForm />
		</PageWrapper>
	);
};

export default CreateTodoPage;
