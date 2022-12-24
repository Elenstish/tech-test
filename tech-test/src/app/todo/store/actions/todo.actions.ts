import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { getFailureType, getSuccessType } from 'src/app/todo/store/constants/get-action-type.constants';
import { TodoInterface } from 'src/app/todo/models/todo.model';

const todoActionTypes = {
  todoList: '[TODO] list',
  todoItem: '[TODO] item',
  editTodo: '[TODO] edit',
  addTodo: '[TODO] add',
  deleteTodo: '[TODO] delete',
  filteredTodo: '[TODO] filtered'
};

export const todoList = createAction(todoActionTypes.todoList);

export const todoListSuccess = createAction(
  getSuccessType(todoActionTypes.todoList),
  props<{ items: TodoInterface[] }>()
);

export const todoListFailure = createAction(
  getFailureType(todoActionTypes.todoList),
  props<{ error: HttpErrorResponse }>()
);

export const todoItem = createAction(
  todoActionTypes.todoItem,
  props<{ id: number }>()
);

export const todoItemSuccess = createAction(
  getSuccessType(todoActionTypes.todoItem),
  props<{ item: TodoInterface }>()
);

export const todoItemFailure = createAction(
  getFailureType(todoActionTypes.todoItem),
  props<{ error: HttpErrorResponse }>()
);

export const patchTodo = createAction(
  todoActionTypes.editTodo,
  props<{ payload: TodoInterface }>()
);

export const patchTodoItemSuccess = createAction(
  getSuccessType(todoActionTypes.editTodo),
  props<{ item: TodoInterface }>()
);

export const patchTodoItemFailure = createAction(
  getFailureType(todoActionTypes.editTodo),
  props<{ error: HttpErrorResponse }>()
);

export const createTodo = createAction(
  todoActionTypes.addTodo,
  props<{ payload: TodoInterface }>()
);

export const createTodoItemSuccess = createAction(
  getSuccessType(todoActionTypes.addTodo),
  props<{ item: TodoInterface }>()
);

export const createTodoItemFailure = createAction(
  getFailureType(todoActionTypes.addTodo),
  props<{ error: HttpErrorResponse }>()
);

export const deleteTodoItem = createAction(
  todoActionTypes.deleteTodo,
  props<{ id: number }>()
);

export const deleteTodoItemSuccess = createAction(
  getSuccessType(todoActionTypes.deleteTodo));

export const deleteTodoItemFailure = createAction(
  getFailureType(todoActionTypes.deleteTodo),
  props<{ error: HttpErrorResponse }>()
);

export const filteredTodo = createAction(
  todoActionTypes.filteredTodo,
  props<{ payload: string }>()
);
