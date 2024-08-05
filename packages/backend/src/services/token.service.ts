import { Token } from '@prisma/client';
import Service from './index.service';
import { prismaClient } from '@/modules/prisma';

export default class TokenService extends Service {
	tokenRepository = prismaClient.token;

	async create(hash: string, userId: number): Promise<void> {
		await this.tokenRepository.create({
			data: {
				token: hash,
				expireAt: new Date(Date.now() + 8000 * 1000),
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	async findOne(userId: number): Promise<Token> {
		return await this.tokenRepository.findFirstOrThrow({
			where: { userId },
		});
	}

	async deleteOne(token: Token): Promise<Token> {
		return await this.tokenRepository.delete({ where: { id: token.id } });
	}
}
