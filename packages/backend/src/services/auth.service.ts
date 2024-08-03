import { HttpError } from '@/helpers/http-error';
import {
	CreateUserType,
	UserNoSensitiveData,
	UserType,
} from '@/types/user.types';
import { prisma } from './prisma/prisma.service';


export default class AuthService {
	removeSensitiveInfo(user: UserType): UserNoSensitiveData {
		const { password: _, ...userNoSensetiveData } = user;
		return userNoSensetiveData;
	}

	async register(data: CreateUserType): Promise<UserNoSensitiveData> {
		const checkUser = await prisma.user.findFirst({
			where: {
				OR: [{ username: data.username }, { email: data.email }],
			},
		});

		if (checkUser) {
			throw HttpError(409, 'User alredy exists');
		}
		const newUser = await prisma.user.create({ data: { ...data } });
	

		return this.removeSensitiveInfo(newUser);
	}
}
