import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { SECRET_KEY_JWT } = process.env;

class TokenService {
	createToken(id: number): string {
		return jwt.sign({ id }, SECRET_KEY_JWT!);
	}
}

export default new TokenService();
