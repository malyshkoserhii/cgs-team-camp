export type TodoType = {
	id: number;
	name: string;
	date: Date;
	descr?: string | null;
	status: string | null;
	updateTime?: Date | null;
	dashboardId: number;
};

export type TodoCreateType = {
	name: string;
	date?: Date;
	status?: string;
	updateTime?: Date | null;
	dashboardId: number;
	userId: number;
	descr?: string | null;
};

export type TodoUpdateType = Partial<TodoCreateType> & { id: number };

export type TodoItemFindingType = {
	status?: string;
	dashboard?: string;
	find?: string;
};
