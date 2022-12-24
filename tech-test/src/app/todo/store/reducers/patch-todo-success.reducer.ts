import { Action, createReducer, on } from '@ngrx/store';

import { patchTodoItemSuccess } from '../actions/todo.actions';

const reducer = createReducer<boolean>(
  null,
  on(patchTodoItemSuccess, (state, { item }) => !!item)
);

export function patchTodoSuccessReducer(state: boolean, action: Action) {
  return reducer(state, action);
}
