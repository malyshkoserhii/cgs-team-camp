// TODO: Put a real types here

export interface Todo {
	id?: string;
	title: string;
	description: string;
	isPrivate: boolean;
	isCompleted?: boolean;
}

// for filtering todos by params
export type TodoQueryParams = {
	search?: string;
	isPrivate?: boolean;
	isCompleted?: boolean;
};

// for isExistMiddleware
export type ModelType = {
	findUnique: (
		args: FindUniqueArgsType,
	) => Promise<Required<{ id: string }> | null>;
};

type FindUniqueArgsType = {
	where: { id: string };
};
