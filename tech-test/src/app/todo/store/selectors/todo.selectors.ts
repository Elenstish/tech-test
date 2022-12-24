import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { TodoState, TodoStateName } from '../models/todo-state.model';
import { TodoInterface } from '../../models/todo.model';

export const selectTodoState = createFeatureSelector<TodoState>(TodoStateName);

export const selectTodoList: MemoizedSelector<object, TodoInterface[]> = createSelector(
  selectTodoState,
  (state: TodoState): TodoInterface[] => state.todoListState
);

export const selectTodoItem: MemoizedSelector<object, TodoInterface> = createSelector(
  selectTodoState,
  (state: TodoState): TodoInterface => state.todoItemState
);

export const selectCreateMyHeroSuccess = createSelector(
  selectTodoState,
  (state: TodoState): boolean => state.createTodoSuccessState
);

export const selectPatchMyHeroSuccess = createSelector(
  selectTodoState,
  (state: TodoState): boolean => state.patchTodoSuccessState
);
