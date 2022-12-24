import { Action, createReducer, on } from '@ngrx/store';

import { TodoInterface } from '../../models/todo.model';
import { todoItemSuccess, patchTodoItemSuccess } from '../actions/todo.actions';

const initialState: TodoInterface = null;

const reducer = createReducer<TodoInterface>(
  initialState,
  on(todoItemSuccess, (state, { item }) => item),
  on(patchTodoItemSuccess, (state, { item }) => item)
);

export function todoItemReducer(state: TodoInterface, action: Action) {
  return reducer(state, action);
}
