import React from 'react';
import {
	VStack,
	FormControl,
	Input,
	Button,
	Textarea,
	HStack,
	FormErrorMessage,
	Text,
	Checkbox,
} from '@chakra-ui/react';

import { TodoSchema } from './validation.schema';
import { ITodo } from '../../../../types/todo/todo.types';
import { Field, Form } from 'react-final-form';
import { FinalFormStyled } from './form.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoStore } from '~/state/store/todo.store';
import TodoModel from '~shared/types/todo/todo.model';
import { validateFormValues } from '~/utils';
import todoService from '../../todo.service';

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
								<Field name="title">
									{({ input, meta }) => (
										<FormControl
											isInvalid={
												meta.touched && meta.error
											}
										>
											<Input
												{...input}
												id="title"
												type="text"
												variant="filled"
												placeholder="Title"
											/>
											{meta.touched && meta.error && (
												<FormErrorMessage>
													{meta.error}
												</FormErrorMessage>
											)}
										</FormControl>
									)}
								</Field>
								<Field name="description">
									{({ input, meta }) => (
										<FormControl
											isInvalid={
												meta.touched && meta.error
											}
										>
											<Textarea
												{...input}
												id="description"
												variant="filled"
												placeholder="Description"
											/>
											{meta.touched && meta.error && (
												<FormErrorMessage>
													{meta.error}
												</FormErrorMessage>
											)}
										</FormControl>
									)}
								</Field>
								<HStack
									width="80%"
									justifyContent="space-between"
									fontSize="x-large"
								>
									<Field name="completed" type="checkbox">
										{({ input }) => {
											return (
												<Checkbox
													defaultChecked={
														input.checked
													}
													id="completed"
													colorScheme="green"
													onChange={(e) => {
														form.change(
															'completed',
															e.target.checked,
														);
													}}
												>
													Completed
												</Checkbox>
											);
										}}
									</Field>
									<Field name="private" type="checkbox">
										{({ input }) => {
											return (
												<Checkbox
													defaultChecked={
														input.checked
													}
													id="private"
													colorScheme="blue"
													onChange={(e) => {
														form.change(
															'private',
															e.target.checked,
														);
													}}
												>
													Private
												</Checkbox>
											);
										}}
									</Field>
								</HStack>
								<Button
									type="submit"
									colorScheme="purple"
									width="full"
								>
									{type}
								</Button>

								{type === 'UPDATE' ? (
									<Button
										onClick={() => {
											deleteTodo(values.id);
											todoService.deleteTodo(values.id);
											onClose();
										}}
										colorScheme="red"
										width="full"
									>
										DELETE
									</Button>
								) : (
									<Button
										colorScheme="red"
										width="full"
										onClick={() => {
											navigate(ROUTER_KEYS.HOME);
										}}
									>
										BACK
									</Button>
								)}
							</VStack>
						</form>
					);
				}}
			/>
		</FinalFormStyled>
	);
};
