import { TodoStatus } from '@/utils/enums/TodoStatus.enum';
import { TodoFilterParams } from '@/utils/types/todos.type';

type QueryParams = {
	status?: TodoStatus;
	isPrivate?: boolean;
	name?: {
		contains: string;
		mode: 'insensitive';
	};
};

type ReturnType = {
	query: QueryParams;
};

export const getQueryParamsTodos = (params: TodoFilterParams): ReturnType => {
	const { status, isPrivate, name } = params;
	const query: QueryParams = {};

	if (status) {
		query.status = status as TodoStatus;
	}
	if (isPrivate) {
		query.isPrivate = isPrivate === 'true' ? true : false;
	}
	if (Boolean(name)) {
		query.name = {
			contains: name,
			mode: 'insensitive',
		};
	}

	return { query };
};
