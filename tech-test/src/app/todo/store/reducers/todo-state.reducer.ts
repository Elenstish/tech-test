import { ActionReducerMap } from '@ngrx/store';

import { TodoState } from 'src/app/todo/store/models/todo-state.model';
import { todoListReducer } from 'src/app/todo/store/reducers/todo-list.reducer';
import { todoItemReducer } from './todo-item.reducer';
import { createTodoSuccessReducer } from './create-todo-success.reducer';
import { patchTodoSuccessReducer } from './patch-todo-success.reducer';

export const todoReducers: ActionReducerMap<TodoState> = {
  todoListState: todoListReducer,
  todoItemState: todoItemReducer,
  createTodoSuccessState: createTodoSuccessReducer,
  patchTodoSuccessState: patchTodoSuccessReducer,
};
