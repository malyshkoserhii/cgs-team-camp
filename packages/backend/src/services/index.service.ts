export default class Service<
	CreateArgs extends unknown[] = unknown[],
	FindOneArgs extends unknown[] = unknown[],
	DeleteOneArgs extends unknown[] = unknown[],
	CreateResult = unknown,
	FindOneResult = unknown,
	DeleteOneResult = unknown,
> {
	async create(..._args: CreateArgs): Promise<CreateResult> {
		return {} as CreateResult;
	}

	async findOne(..._args: FindOneArgs): Promise<FindOneResult> {
		return {} as FindOneResult;
	}

	async deleteOne(..._args: DeleteOneArgs): Promise<DeleteOneResult> {
		return {} as DeleteOneResult;
	}
}
