import React, { FC } from 'react';
import { TableWrapper } from './TodoMainPage.styles';

interface TableWrapperProps {
	children: React.ReactNode;
}

const TableWrapperComponent: FC<TableWrapperProps> = ({ children }) => (
	<TableWrapper>
		<thead>
			<tr>
				<th>Title</th>
				<th>Description</th>
				<th>Completed</th>
			</tr>
		</thead>
		<tbody>{children}</tbody>
	</TableWrapper>
);

export default TableWrapperComponent;
