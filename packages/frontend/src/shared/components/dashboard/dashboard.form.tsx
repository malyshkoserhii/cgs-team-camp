import { useFormik } from 'formik';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Switch,
	Stack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useDashboardStore } from '~store/index';
// @ts-expect-error have issue with chakra-ui library, developers says to ignore it
import { Input } from '@chakra-ui/react';
const DashboardForm: React.FC = () => {
	const { addDashboard } = useDashboardStore((state) => ({
		addDashboard: state.addDashboard,
	}));

	const formik = useFormik({
		initialValues: {
			name: '',
			ownername: '',
			date: new Date(),
			descr: '',
			private: false,
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required'),
			ownername: Yup.string().required('Owner name is required'),
			private: Yup.boolean(),
		}),
		onSubmit: async (values, { resetForm }) => {
			await addDashboard(values);
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
						id="ownername"
						isInvalid={
							formik.touched.ownername &&
							!!formik.errors.ownername
						}
					>
						<FormLabel>Owner Name</FormLabel>
						<Input
							name="ownername"
							value={formik.values.ownername}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.ownername && formik.errors.ownername ? (
							<div>{formik.errors.ownername}</div>
						) : null}
					</FormControl>

					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="private" mb="0">
							Private
						</FormLabel>
						<Switch
							id="private"
							name="private"
							isChecked={formik.values.private}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</FormControl>

					<Button type="submit" colorScheme="teal">
						Add Dashboard
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default DashboardForm;
