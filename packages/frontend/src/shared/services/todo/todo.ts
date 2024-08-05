import { ITodo, ITodoCreate } from "~/types/todo.type";
import HttpService from "../http/http";


class TodoService extends HttpService {
  constructor() {
      super();
  }

  async getAllTodos() {
      return await this.get({ url: 'todos' });
  }

  async editTodo(todo: ITodo) {
      return await this.put({
          url: `todos/${todo.id}`,
          data: { ...todo, id: undefined },
      });
  }

  async deleteTodo(todoId: number) {
      return await this.delete({
          url: `todos/${todoId}`,
      });
  }

  async createTodo(todo: ITodoCreate) {
      return await this.post({
          url: 'todos',
          data: todo,
      });
  }

  async getOneTodo(todoId: number) {
      return await this.get({
          url: `todos/one/${todoId}`,
      });
  }

  async completeTodo(todoId: number) {
      return await this.get({
          url: `todos/complete/${todoId}`,
      });
  }
}

const todoService = new TodoService();
export default todoService;