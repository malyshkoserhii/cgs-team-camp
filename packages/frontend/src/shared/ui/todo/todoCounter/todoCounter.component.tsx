import { ReactElement } from 'react';
import { Flex } from '~shared/ui/base/flex';
import Button from '~shared/ui/button/button.component';
import { useTodoStore } from '~store/todos.store';

export const TodoCounter = (): ReactElement => {
	const { statusCounter } = useTodoStore();

	return (
		<Flex gap="10px">
			<Button
				toolTipMessage="Tasks completed"
				variant="clear"
				icon="tick"
				text={`${statusCounter.completedCount}`}
			/>

			<Button
				toolTipMessage="Tasks in progress"
				variant="clear"
				icon="high-priority"
				text={`${statusCounter.inProgressCount}`}
			/>
		</Flex>
	);
};
