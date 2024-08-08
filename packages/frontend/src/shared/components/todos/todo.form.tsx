import { useFormik } from 'formik';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Select,
	Stack,
} from '@chakra-ui/react';
// @ts-expect-error have issue with chakra-ui library, developers says to ignore it
import { Input } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useTodoStore } from '~store/index';

interface TodoItemFormProps {
	dashboardId: number;
}

const TodoItemForm: React.FC<TodoItemFormProps> = ({ dashboardId }) => {
	const { addTodo } = useTodoStore((state) => ({
		addTodo: state.addTodo,
	}));

	const formik = useFormik({
		initialValues: {
			name: '',
			status: 'ToDo',
			descr: '',
			date: new Date(),
			dashboardId,
			userId: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required'),
			status: Yup.string().required('Status is required'),
			descr: Yup.string(),
			userId: Yup.string().required('UserId is required'),
		}),
		onSubmit: async (values, { resetForm }) => {
			await addTodo({
				...values,
				userId: Number(values.userId),
				dashboardId,
			});
			resetForm();
		},
	});

	return (
		<Box mb={8}>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={4}>
					<FormControl
						id="name"
						isInvalid={formik.touched.name && !!formik.errors.name}
					>
						<FormLabel>Name</FormLabel>
						<Input
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.name && formik.errors.name ? (
							<div>{formik.errors.name}</div>
						) : null}
					</FormControl>

					<FormControl
						id="status"
						isInvalid={
							formik.touched.status && !!formik.errors.status
						}
					>
						<FormLabel>Status</FormLabel>
						<Select
							name="status"
							value={formik.values.status}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value="ToDo">ToDo</option>
							<option value="InProgress">InProgress</option>
							<option value="Done">Done</option>
						</Select>
						{formik.touched.status && formik.errors.status ? (
							<div>{formik.errors.status}</div>
						) : null}
					</FormControl>

					<FormControl
						id="descr"
						isInvalid={
							formik.touched.descr && !!formik.errors.descr
						}
					>
						<FormLabel>Description</FormLabel>
						<Input
							name="descr"
							value={formik.values.descr}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.descr && formik.errors.descr ? (
							<div>{formik.errors.descr}</div>
						) : null}
					</FormControl>

					<FormControl
						id="userId"
						isInvalid={
							formik.touched.userId && !!formik.errors.userId
						}
					>
						<FormLabel>UserID</FormLabel>
						<Input
							name="userId"
							value={formik.values.userId}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.userId && formik.errors.userId ? (
							<div>{formik.errors.userId}</div>
						) : null}
					</FormControl>

					<Button type="submit" colorScheme="teal">
						Add Todo
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default TodoItemForm;
