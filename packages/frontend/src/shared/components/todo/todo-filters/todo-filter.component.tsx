import React from 'react';
import { Stack, StackProps, Checkbox } from '@chakra-ui/react';
import { TodoFilterEnum } from '../todo.enums';
import { useFilterStore } from '~/state/store/filter.store';
import { COLORS } from '~/theme';
import { TodoFiltersParams } from '~shared/types/todo/todo.types';
import { isMobile } from 'react-device-detect';

interface TodoFilterProps extends Omit<StackProps, 'children'> {}

export const TodoFilter: React.FunctionComponent<TodoFilterProps> = ({
	...props
}) => {
	const { data: filterData, setFilter } = useFilterStore();

	return (
		<Stack {...props}>
			{Object.values(TodoFilterEnum)?.map((value, index) => {
				const isChecked = filterData.filter.includes(
					value.toLowerCase() as TodoFiltersParams,
				);

				return (
					<Checkbox
						name={value.toLowerCase()}
						sx={{
							'&': isMobile
								? {
										width: '100%',
										textAlign: 'center',
									}
								: {
										borderTop: '1px solid',
										borderLeft: '1px solid',
										borderRight: '1px solid',
										borderColor: `${COLORS.gray}`,
										borderRadius: '0.5em 0.5em 0 0',
									},
							'& input[type="checkbox"]': {
								position: 'absolute',
								opacity: 0,
								width: 0,
								height: 0,
							},
							'& .chakra-checkbox__control': {
								display: 'none',
							},
							'& .chakra-checkbox__label': {
								margin: 0,
								cursor: 'pointer',
								width: '100%',
								borderRadius: isMobile
									? '0'
									: '0.5em 0.5em 0 0',
								padding: 2,
								transition: 'background-color 0.2s',
								borderBottom: '0px',
								bg: isChecked ? 'gray.100' : 'white',
								'&:hover': {
									bg: 'gray.100',
								},
							},
						}}
						key={index}
						onChange={(e) => {
							const { checked, name } = e.target;
							setFilter({
								...filterData,
								page: 1,
								filter: (checked
									? [...filterData.filter, name]
									: filterData.filter.filter(
											(f) => f !== name,
										)) as TodoFiltersParams[],
							});
						}}
					>
						{value}
					</Checkbox>
				);
			})}
		</Stack>
	);
};
