import { UserI } from '~shared/interfaces/user.interface copy';

export class UserFormModel {
	public name: string;
	public password: string;
	public email: string;

	constructor(model?: UserI) {
		this.name = model?.name || '';
		this.password = model?.password || '';
		this.email = model?.email || '';
	}
}
