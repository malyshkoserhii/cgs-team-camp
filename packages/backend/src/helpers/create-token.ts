import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

const createToken = (id: string | number): string => {
	return jwt.sign({ id }, JWT_SECRET!);
};

export default createToken;
