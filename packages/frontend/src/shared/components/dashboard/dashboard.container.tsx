import {
	Box,
	Button,
	List,
	ListItem,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react';
import { useDashboardStore } from '~store/index';
import { useEffect } from 'react';
import DashboardItem from './dashboard.item';
import { THEME } from '../../styles/theme';
import { Link as RouterLink } from 'react-router-dom';

const DashboardList: React.FC = () => {
	const toast = useToast();
	const { dashboards, deleteDashboard, updateDashboard, fetchDashboards } =
		useDashboardStore((state) => ({
			dashboards: state.dashboards,
			deleteDashboard: state.removeDashboard,
			updateDashboard: state.updateDashboard,
			fetchDashboards: state.fetchDashboards,
		}));

	useEffect(() => {
		fetchDashboards();
	}, [fetchDashboards]);
	const [isTablet] = useMediaQuery('(max-width: 768px)');
	const [isMobile] = useMediaQuery('(max-width: 480px)');

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
		<Box>
			{isMobile ? (
				<List>
					{dashboards.map((dashboard) => (
						<ListItem key={dashboard.id}>
							<DashboardItem dashboard={dashboard} />
						</ListItem>
					))}
				</List>
			) : isTablet ? (
				<Box
					style={{
						display: 'flex',
						overflowX: 'scroll',
						width: '100%',
					}}
				>
					{dashboards.map((dashboard) => (
						<Box
							key={dashboard.id}
							style={{
								flex: '0 0 auto',
								justifyContent: 'space-between',
								margin: THEME.spacing.medium,
							}}
						>
							<DashboardItem
								key={dashboard.id}
								dashboard={dashboard}
							/>
						</Box>
					))}
				</Box>
			) : (
				<Table>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Name</Th>
							<Th>Status</Th>
							<Th>Owner name</Th>
							<Th>Action buttons</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dashboards.map((dashboard) => (
							<Tr key={dashboard.id}>
								<Td>{dashboard.id}</Td>
								<Td>{dashboard.name}</Td>
								<Td>
									{dashboard.private ? 'Private' : 'Public'}
								</Td>
								<Td>{dashboard.ownername}</Td>
								<Td>
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
										onClick={() => handleUpdate(dashboard)}
										colorScheme="blue"
										size="sm"
										mt={2}
										ml={2}
									>
										Update
									</Button>
									<Button
										onClick={() =>
											handleDelete(dashboard.id)
										}
										colorScheme="red"
										size="sm"
										mt={2}
										ml={2}
									>
										Delete
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			)}
		</Box>
	);
};

export default DashboardList;
