import { useFormik } from 'formik';
import { useDashboardStore } from '../../../store/index';

const DashboardForm: React.FC = () => {
	const { addDashboard } = useDashboardStore();

	const formik = useFormik({
		initialValues: {
			name: '',
			ownername: '',
			descr: '',
			private: false,
			date: new Date(),
		},
		onSubmit: async (values) => {
			try {
				await addDashboard({
					name: values.name,
					descr: values.descr,
					ownername: values.ownername,
					private: values.private,
				});
				formik.resetForm();
			} catch (error) {
				console.error('Failed to create dashboard', error);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<label>
				Name:
				<input
					type="text"
					name="name"
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
			</label>
			<label>
				Name:
				<input
					type="text"
					name="descr"
					onChange={formik.handleChange}
					value={formik.values.descr}
				/>
			</label>
			<label>
				Owner Name:
				<input
					type="text"
					name="ownername"
					onChange={formik.handleChange}
					value={formik.values.ownername}
				/>
			</label>
			<label>
				Private:
				<input
					type="checkbox"
					name="private"
					onChange={formik.handleChange}
					checked={formik.values.private}
				/>
			</label>
			<button type="submit">Create Dashboard</button>
		</form>
	);
};

export default DashboardForm;
