import { TodoStatus } from '@/utils/enums/TodoStatus.enum';
import { TodoFilterParams } from '@/utils/types/todos.type';

type QueryParams = {
	status?: TodoStatus;
	isPrivate?: boolean;
	name?: {
		contains: string;
		mode: 'insensitive';
	};
	page?: string | number;
	limit?: number | string;
};

type ReturnType = {
	query: QueryParams;
	pagination: { skip: number; take: number };
};

const defaultPage = 1;
const defaultLimit = 10;

export const getQueryParamsTodos = (params: TodoFilterParams): ReturnType => {
	const {
		status,
		isPrivate,
		name,
		page = defaultPage,
		limit = params.showMore ? defaultLimit * +page : defaultLimit,
	} = params;

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

	const skip = (Number(page) - 1) * Number(limit);

	return {
		query,
		pagination: { skip: params.showMore ? 0 : skip, take: Number(limit) },
	};
};
