import { DashboardType } from '../../../typings/dashboard.type';
import { useDashboardStore } from '../../../store';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface DashboardItemProps {
	dashboard: DashboardType;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ dashboard }) => {
	const toast = useToast();
	const { deleteDashboard, updateDashboard } = useDashboardStore((state) => ({
		deleteDashboard: state.removeDashboard,
		updateDashboard: state.updateDashboard,
	}));

	const handleDelete = (id: number): void => {
		deleteDashboard(id);
		toast({
			title: 'Dashboard deleted.',
			description: 'The dashboard has been deleted successfully.',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdate = (dashboard): void => {
		updateDashboard(dashboard);
		toast({
			title: 'Dashboard updated.',
			description: 'The dashboard has been updated successfully.',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Box key={dashboard.id} p={4} borderWidth={1} borderRadius="lg">
			<Text>{dashboard.name}</Text>
			<Button
				as={RouterLink}
				to={`/dashboard/${dashboard.id}`}
				colorScheme="teal"
				size="sm"
				mt={2}
			>
				View Dashboard
			</Button>
			<Button
				onClick={() => handleUpdate(dashboard.id)}
				colorScheme="blue"
				size="sm"
				mt={2}
				ml={2}
			>
				Update
			</Button>
			<Button
				onClick={() => handleDelete(dashboard.id)}
				colorScheme="red"
				size="sm"
				mt={2}
				ml={2}
			>
				Delete
			</Button>
		</Box>
	);
};

export default DashboardItem;
