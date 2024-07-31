import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';

export class TodoFormModel {
	public name: string;
	public description: string;
	public status: TodoStatusE;
	public isPrivate: string;

	constructor(model?: TodoI) {
		this.name = model?.name || '';
		this.description = model?.description || '';
		this.status = model?.status || TodoStatusE.InProgress;
		this.isPrivate = model?.isPrivate ? 'true' : 'false';
	}
}
