import jwt from 'jsonwebtoken';

const { SECRET_KEY_JWT } = process.env;

export class TokenService {
	createToken(id: string): string {
		return jwt.sign({ id }, SECRET_KEY_JWT as string);
	}
}
