// src/modules/dashboard/dashboardForm.tsx
import * as React from 'react';
import { useFormik } from 'formik';
import { useDashboardStore } from '../../../store';
import { DashboardCreateType } from '../../../typings/dashboard.type';

const DashboardForm: React.FC = () => {
	const { addDashboard } = useDashboardStore();

	const formik = useFormik<DashboardCreateType>({
		initialValues: {
			name: '',
			descr: '',
			ownername: '',
			private: false,
		},
		onSubmit: (values) => {
			addDashboard(values);
			formik.resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<input
				type="text"
				name="name"
				value={formik.values.name}
				onChange={formik.handleChange}
				placeholder="Name"
			/>
			<textarea
				name="descr"
				value={formik.values.descr}
				onChange={formik.handleChange}
				placeholder="Description"
			/>
			<input
				type="text"
				name="ownername"
				value={formik.values.ownername}
				onChange={formik.handleChange}
				placeholder="Owner Name"
			/>
			<label>
				Private
				<input
					type="checkbox"
					name="private"
					checked={formik.values.private}
					onChange={formik.handleChange}
				/>
			</label>
			<button type="submit">Add Dashboard</button>
		</form>
	);
};

export default DashboardForm;
