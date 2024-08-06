import TodoModel from '~shared/types/todo/todo.model';
import { ITodoStore } from '../store/todo.store';

export const selectTodos = (state: ITodoStore): TodoModel[] => state.todos;
