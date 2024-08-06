import { TodoStatusE } from '~shared/enums/TodoStatus.enum';

export class TodoFilterModel {
	public status?: TodoStatusE;
	public isPrivate: string;
	public name: string;

	constructor(model?: Partial<TodoFilterModel>) {
		this.name = model?.name || '';
		this.status = model?.status || TodoStatusE.All;
		this.isPrivate = model?.isPrivate ? model.isPrivate : '';
	}
}
