import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TodoState } from '../models/todo-state.model';
import { TodoInterface } from '../../models/todo.model';
import { todoList, todoItem, filteredTodo, patchTodo, createTodo, deleteTodoItem } from '../actions/todo.actions';
import { selectTodoList, selectTodoItem, selectCreateMyHeroSuccess, selectPatchMyHeroSuccess } from '../selectors/todo.selectors';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {

  constructor(
    private store: Store<TodoState>
  ) { }

  public getTodoList(): void {
    this.store.dispatch(todoList());
  }

  public selectTodoList$(): Observable<TodoInterface[]> {
    return this.store.pipe(select(selectTodoList));
  }

  public getTodoItem(itemId: number): void {
    this.store.dispatch(todoItem({ id: itemId }));
  }

  public selectTodoItem$(): Observable<TodoInterface> {
    return this.store.pipe(select(selectTodoItem));
  }

  public filteredTodoList(searchValue: string): void {
    this.store.dispatch(filteredTodo({ payload: searchValue }));
  }

  public patchTodo(formValue: TodoInterface): void {
    this.store.dispatch(patchTodo({ payload: formValue }));
  }

  public patchTodoSuccessAction$(): Observable<boolean> {
    return this.store.pipe(select(selectPatchMyHeroSuccess));
  }

  public createTodo(formValue: TodoInterface): void {
    this.store.dispatch(createTodo({ payload: formValue }));
  }

  public createTodoSuccessAction$(): Observable<boolean> {
    return this.store.pipe(select(selectCreateMyHeroSuccess));
  }

  public deleteTodoItem(itemId: number): void {
    this.store.dispatch(deleteTodoItem({ id: itemId }));
  }
}
