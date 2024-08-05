export type Todo = {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	public: boolean;
};

export type ViewType = 'table' | 'card' | 'list';
