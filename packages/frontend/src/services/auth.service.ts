import { HttpService } from '~services/http.service';
import { User } from '~typings/user.types';
import { AxiosResponse } from 'axios';
import { API_KEYS } from '~shared/keys';

export class AuthService extends HttpService {
	constructor() {
		super();
	}

	async registerUser(user: User): Promise<AxiosResponse<User>> {
		return this.post({ url: API_KEYS.REGISTER, data: user });
	}

	async verifyEmail(token: string): Promise<AxiosResponse<User>> {
		console.log(
			'API_KEYS.VERIFY_EMAIL(token)',
			API_KEYS.VERIFY_EMAIL(token),
		);
		return this.post({ url: 'auth/verify-email/' });
	}
}
