import * as React from 'react';
import { todoElementStyles } from './TodoElement.styles';

interface TodoElementProps {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	onClick: () => void;
}

const TodoElement: React.FC<TodoElementProps> = ({
	title,
	description,
	completed,
	onClick,
}) => {
	return (
		<div onClick={onClick} className={todoElementStyles}>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>{completed ? 'Completed' : 'Not Completed'}</p>
		</div>
	);
};

export default TodoElement;
