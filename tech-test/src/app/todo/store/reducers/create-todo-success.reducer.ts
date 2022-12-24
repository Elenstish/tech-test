import { Action, createReducer, on } from '@ngrx/store';

import { createTodoItemSuccess } from '../actions/todo.actions';

const reducer = createReducer<boolean>(
  null,
  on(createTodoItemSuccess, (state, { item }) => !!item)
);

export function createTodoSuccessReducer(state: boolean, action: Action) {
  return reducer(state, action);
}
