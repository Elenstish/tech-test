import { TodoInterface } from 'src/app/todo/models/todo.model';

export const TodoStateName = 'todo';

export interface TodoState {
  todoListState: TodoInterface[];
  todoItemState: TodoInterface;
  createTodoSuccessState: boolean;
  patchTodoSuccessState: boolean;
}
