import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import Button from '~shared/components/button/button.component';
import {
	BarContainer,
	ButtonsContainer,
	FilterInput,
} from './TodoPageBar.styles';

export type TodoPageBarProps = {
	onAddTodo: () => void;
	onFilterPublic?: () => void;
	showAllTodos: () => void;
	onFilterCompleted?: () => void;
	onFilterPrivate?: () => void;
	searchInputValue: string;
	onSearchnputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoPageBar = ({
	onAddTodo,

	showAllTodos,
	searchInputValue,
	onSearchnputChange,
	onFilterPrivate,
	onFilterPublic,
	onFilterCompleted,
}: TodoPageBarProps): JSX.Element => {
	return (
		<div className={BarContainer}>
			<div className={ButtonsContainer}>
				<Button text="All" onClick={showAllTodos} type="button" />
				<Button
					text="Private"
					onClick={onFilterPrivate}
					type="button"
				/>
				<Button text="Public" onClick={onFilterPublic} />
				<Button
					text="Completed"
					onClick={onFilterCompleted}
					type="button"
				/>
				<Button text="Create Todo" onClick={onAddTodo} type="button" />
			</div>

			<DebounceInput
				type="text"
				placeholder="Search"
				className={FilterInput}
				value={searchInputValue}
				onChange={onSearchnputChange}
				debounceTimeout={400}
			/>
		</div>
	);
};

export default TodoPageBar;
