import { User } from '@prisma/client';

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface LoginResponse {
	user: User;
	tokens: AuthTokens;
}
