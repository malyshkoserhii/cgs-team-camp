import { TodoStatusE } from '~shared/enums/TodoStatus.enum';

export class TodoFilterModel {
	public status?: TodoStatusE;
	public isPrivate: string;
	public name: string;

	constructor(model?: TodoFilterModel) {
		this.name = model?.name || '';
		this.status = model?.status || TodoStatusE.InProgress;
		this.isPrivate = JSON.parse(model?.isPrivate) ? 'true' : 'false';
	}
}
