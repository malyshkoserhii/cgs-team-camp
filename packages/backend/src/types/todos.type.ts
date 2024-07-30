import { TodoItem } from '@prisma/client';
export type TodoType = TodoItem;
export type CreateTodoType = Omit<TodoItem, 'id'>;
export type UpdateTodoType = Partial<TodoItem>;
export type GetAllTodosType = TodoItem[];
