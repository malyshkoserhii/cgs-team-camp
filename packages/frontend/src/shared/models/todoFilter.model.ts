import { TodoStatusE } from '~shared/enums/TodoStatus.enum';

export class TodoFilterModel {
	public status?: TodoStatusE;
	public isPrivate: string;
	public name: string;
	public page: number;
	public showMore: string;

	constructor(model?: Partial<TodoFilterModel>) {
		this.name = model?.name || '';
		this.status = model?.status || TodoStatusE.All;
		this.isPrivate = model?.isPrivate ? model.isPrivate : '';
		this.page = model?.page || 1;
		this.showMore = model?.showMore || '';
	}
}
