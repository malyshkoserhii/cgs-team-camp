
import { ITodo, ITodoCreate } from '~/types/todo.type';
import HttpService from '../http/http';

class TodoService extends HttpService {
  constructor() {
    super();
  }
  getAllTodos() {
    return this.get({
      url: 'todos',
    }, true)
  }
  editTodo(todo: ITodo) {
    return this.put({
      url: `todos/${todo.id}`,
      data: {...todo, id: undefined},
    }, true)
  }
  deleteTodo(todoId: number) {
    return this.delete({
      url: `todos/${todoId}`,
    }, true)
  }
  createTodo(todo: ITodoCreate) {
    return this.post({
      url: 'todos',
      data: todo,
    }, true)
  }
  getOneTodo(todoId: number) {
    return this.get({
      url: `todos/one/${todoId}`,
    }, true)
  }
  completeTodo(todoId: number) {
    return this.get({
      url: `todos/complete/${todoId}`,
    }, true)
  }
}

const todoService = new TodoService()
export default todoService