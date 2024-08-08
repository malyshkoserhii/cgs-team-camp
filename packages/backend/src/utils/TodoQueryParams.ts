// type TitleQuery = { contains: string; mode: 'insensitive' };
//
// export type TodoQueryParams = {
// 	title?: TitleQuery;
// 	isPrivate?: boolean;
// 	isCompleted?: boolean;
// };
//
// export const getQueryParamsTodos = (
// 	params: TodoQueryParams,
// ): {
// 	queryParams: TodoQueryParams;
// } => {
// 	const queryParams: TodoQueryParams = {};
//
// 	if (params.isCompleted) {
// 		queryParams.isCompleted = params.isCompleted;
// 	}
// 	if (params.isPrivate) {
// 		queryParams.isPrivate = params.isPrivate;
// 	}
//
// 	if (params.title) {
// 		// TODO how to create type for tile ???
// 		queryParams.title = { contains: params.title, mode: 'insensitive' };
// 	}
//
// 	return { queryParams };
// };
