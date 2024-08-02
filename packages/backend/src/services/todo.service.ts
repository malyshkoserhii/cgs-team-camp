import { ITodo } from '@/types/todos.type';
import { PrismaClient } from '@prisma/client';

export default class TodoService {
	private prisma: PrismaClient = new PrismaClient();

	async findAll(): Promise<ITodo[]> {
		const allTodo = await this.prisma.todo.findMany();
		return allTodo;
	}

	async create(todo:ITodo):Promise<ITodo> {
		console.log(todo)
		const saveTodo = await this.prisma.todo.create({ data: todo });
		return saveTodo;
	}

	async update(_id: number, newTodo: ITodo):Promise<ITodo | null> {
		const toUpdateTodo = await this.prisma.todo.update({
			where: {
				id: _id,
			},
			data: newTodo,
		});
		return toUpdateTodo;
	}
	async findOne(_id:number):Promise<ITodo | null>{
		const todo = await this.prisma.todo.findUnique({
			where:{
				id:_id
			}
		})
		return todo;
	}

	async isExist(id:number):Promise<boolean>{
		return !!(await this.findOne(id));
	}
	
	async remove(_id: number):Promise<void>{
		await this.prisma.todo.delete({where:{
			id:_id
		}});
	}
}
