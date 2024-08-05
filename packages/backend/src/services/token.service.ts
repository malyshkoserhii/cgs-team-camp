import jwt from 'jsonwebtoken';

const { SECRET_KEY_JWT } = process.env;
console.log('SECRET_KEY_JWT:', SECRET_KEY_JWT);

export class TokenService {
	createToken(id: string): string {
		return jwt.sign({ id }, SECRET_KEY_JWT as string);
	}
}
