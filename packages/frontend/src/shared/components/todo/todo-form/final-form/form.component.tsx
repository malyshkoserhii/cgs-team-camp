import React from 'react';
import {
	VStack,
	Input,
	Button,
	Textarea,
	HStack,
	Text,
	Checkbox,
} from '@chakra-ui/react';

import { TodoSchema } from './validation.schema';
import { ITodo } from '../../../../types/todo/todo.types';
import { Form } from 'react-final-form';
import { FinalFormStyled } from './form.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoStore } from '~/state/store/todo.store';
import TodoModel from '~shared/types/todo/todo.model';
import { validateFormValues } from '~/utils';
import todoService from '../../todo.service';
import { FormInput } from '../../../ui/form/form-input';
import { FormButton } from '../../../ui/form/form-button';

export interface FormikFormProps {
	type: 'ADD' | 'UPDATE';
	onClose?(): void;
	initialState?: ITodo;
}

export const FinalForm: React.FunctionComponent<FormikFormProps> = ({
	type,
	initialState,
	onClose,
}) => {
	const navigate = useNavigate();
	const validate = validateFormValues(TodoSchema);
	const { addTodo, updateTodo, deleteTodo } = useTodoStore();

	const onSubmit = (e: typeof initialState): void => {
		const todoModel = new TodoModel(
			e.title,
			e.description,
			e.private,
			e.completed,
			e.id,
		);

		if (type === 'UPDATE') {
			updateTodo(todoModel);
			todoService.updateTodo(todoModel);
			onClose();
		} else if (type === 'ADD') {
			addTodo(todoModel);
			todoService.createTodo(todoModel);
			navigate(ROUTER_KEYS.HOME);
		}
	};

	return (
		<FinalFormStyled>
			<Text textAlign="center" marginBottom={'2em'} fontSize={'1.5em'}>
				{type === 'ADD' ? 'Create TODO' : 'Update TODO'}
			</Text>
			<Form
				onSubmit={onSubmit}
				initialValues={initialState}
				validate={validate}
				render={({ handleSubmit, form, values }) => {
					return (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="center">
								<FormInput
									name="title"
									placeholder="Title"
									Component={Input}
								/>
								<FormInput
									name="description"
									placeholder="Description"
									Component={Textarea}
								/>
								<HStack
									width="80%"
									justifyContent="space-between"
									fontSize="x-large"
								>
									<FormInput
										name="completed"
										Component={Checkbox}
										onChange={(e) => {
											form.change(
												'completed',
												e.target.checked,
											);
										}}
										defaultChecked={values.completed}
									>
										Completed
									</FormInput>
									<FormInput
										name="private"
										Component={Checkbox}
										onChange={(e) => {
											form.change(
												'private',
												e.target.checked,
											);
										}}
										defaultChecked={values.private}
									>
										Private
									</FormInput>
								</HStack>
								<Button
									type="submit"
									colorScheme="purple"
									width="full"
								>
									{type}
								</Button>

								{type === 'UPDATE' ? (
									<FormButton
										onClick={() => {
											deleteTodo(values.id);
											todoService.deleteTodo(values.id);
											onClose();
										}}
										color="red"
									>
										DELETE
									</FormButton>
								) : (
									<FormButton
										color="red"
										onClick={() => {
											navigate(ROUTER_KEYS.HOME);
										}}
									>
										BACK
									</FormButton>
								)}
							</VStack>
						</form>
					);
				}}
			/>
		</FinalFormStyled>
	);
};
