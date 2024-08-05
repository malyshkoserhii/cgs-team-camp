export interface UserI {
	id: number;
	name: string;
	email: string;
	password: string;
	refreshToken?: string;
	activationToken?: string;
	isActivated: boolean;
	createdAt: Date;
	updatedAt: Date;
	todos: number[];
}

export interface TokenI {
	accessToken: string;
	refreshToken: string;
}
