import * as React from 'react';

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
		<div
			onClick={onClick}
			style={{
				border: '1px solid black',
				margin: '10px',
				padding: '10px',
			}}
		>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>{completed ? 'Completed' : 'Not Completed'}</p>
		</div>
	);
};

export default TodoElement;
