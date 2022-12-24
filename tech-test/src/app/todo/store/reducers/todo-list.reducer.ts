import { Action, createReducer, on } from '@ngrx/store';

import { TodoInterface } from '../../models/todo.model';
import { filteredTodo, todoListSuccess } from '../actions/todo.actions';

const initialState: TodoInterface[] = [];
let todoList: TodoInterface[] = [];

const reducer = createReducer<TodoInterface[]>(
  initialState,
  on(todoListSuccess, (state, { items }) => {
    todoList = items;
    return items;
  }),
  on(filteredTodo, (state, { payload }) =>
  todoList.filter(item => item.label.toLowerCase().includes(payload.toLowerCase()))
  )
);

export function todoListReducer(state: TodoInterface[], action: Action) {
  return reducer(state, action);
}
