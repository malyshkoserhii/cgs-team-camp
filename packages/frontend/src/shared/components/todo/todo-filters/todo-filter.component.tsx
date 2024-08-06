import React from 'react';
import { Tabs, TabList, Tab, TabsProps } from '@chakra-ui/react';

import { TodoFilterEnum } from '../todo.enums';

interface TodoFilterProps extends Omit<TabsProps, 'children'> {}

export const TodoFilter: React.FunctionComponent<TodoFilterProps> = ({
	...props
}) => (
	<Tabs {...props}>
		<TabList justifyContent={props.justifyContent} height="100%">
			{Object.values(TodoFilterEnum)?.map((value, index) => (
				<Tab key={index}>{value}</Tab>
			))}
		</TabList>
	</Tabs>
);
