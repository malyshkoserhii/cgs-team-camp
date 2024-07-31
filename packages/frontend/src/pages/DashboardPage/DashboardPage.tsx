import { ReactElement, ReactNode } from 'react';
import { Form } from '~shared/components/form';
import {
	FormOption,
	FormVariantsEnum,
} from '~shared/components/form/types/form.type';
import { AppGrid } from '~shared/components/grid';
import { todoSchemaResolver } from '~shared/joiSchemas/joiSchemas/todo/todo.schema';
import { TodoFormModel } from '~shared/models/todo.model';

const TodoItem = ({ id, title }): ReactNode => (
	<li style={{ color: 'red' }} key={id}>
		{title}
	</li>
);

const todos = [
	{ id: '1', title: 'Learn React' },
	{ id: '2', title: 'Learn TypeScript' },
	{ id: '3', title: 'Learn React' },
	{ id: '4', title: 'Learn TypeScript' },
	{ id: '5', title: 'Learn React' },
	{ id: '6', title: 'Learn TypeScript' },
	// Add more todos here
];

const options: FormOption<FormVariantsEnum>[] = [
	{
		id: 'name',
		variant: FormVariantsEnum.Input,
		name: 'Name',
		isRequired: true,
		placeholder: 'Write task name...',
	},
	{
		id: 'description',
		variant: FormVariantsEnum.Input,
		name: 'Description',
		isRequired: true,
		placeholder: 'Write task description...',
	},
	{
		id: 'isPrivate',
		variant: FormVariantsEnum.Radio_Group,
		name: 'Privacy',
		isRequired: true,
		options: [
			{ label: 'Public', value: 'false' },
			{ label: 'Private', value: 'true' },
		],
	},
];

const DashboardPage = (): ReactElement => {
	return (
		<>
			<Form<TodoFormModel>
				options={options}
				defaultValues={new TodoFormModel()}
				formValidationSchema={todoSchemaResolver}
				onSubmit={() => console.log}
			/>
			<AppGrid items={todos} renderItem={TodoItem} />
		</>
	);
};

export default DashboardPage;
