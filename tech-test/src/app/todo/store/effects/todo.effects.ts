import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { TodoApiService } from 'src/app/todo/store/services/todo-api.service';
import { TodoInterface } from '../../models/todo.model';
import * as actions from '../actions/todo.actions';

@Injectable()

export class TodoEffects {
  public getTodoList$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.todoList),
      exhaustMap(() =>
        this.todoApiService.getTodoList()
          .pipe(
            map((list: TodoInterface[]) =>
                actions.todoListSuccess({ items: list })
              ),
            catchError((error: HttpErrorResponse) => of(actions.todoListFailure({ error })))
          )
      )
    )
  );

  public getTodoitem$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(actions.todoItem),
        exhaustMap(({ id }) => this.todoApiService.getTodoItem(id)
          .pipe(
            map((todoItem: TodoInterface) => actions.todoItemSuccess({ item: todoItem })),
            catchError((error: HttpErrorResponse) => of(actions.todoItemFailure({ error })))
          )
        )
      )
  );

  public createTodo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(actions.createTodo),
        exhaustMap(({ payload }) => this.todoApiService.postTodoItem(payload)
          .pipe(
            map((todoItem: TodoInterface) => actions.createTodoItemSuccess({ item: todoItem })),
            catchError((error: HttpErrorResponse) => of(actions.createTodoItemFailure({ error })))
          )
        )
      )
  );

  public patchTodo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(actions.patchTodo),
        exhaustMap(({ payload }) => this.todoApiService.patchTodoItem(payload)
          .pipe(
            map((todoItem: TodoInterface) => actions.patchTodoItemSuccess({ item: todoItem })),
            catchError((error: HttpErrorResponse) => of(actions.patchTodoItemFailure({ error })))
          )
        )
      )
  );

  public deleteTodo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(actions.deleteTodoItem),
        exhaustMap(({ id }) => this.todoApiService.deleteTodoItem(id)
        .pipe(
          tap(value => console.log('value', value)),
          map(() => {
            this.router.navigate(['todo-list']);
            return actions.deleteTodoItemSuccess()
          }),
          catchError((error: HttpErrorResponse) => of(actions.deleteTodoItemFailure({ error })))
        )
      )
    )
  );

  public getToaster$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(...[
          actions.createTodoItemSuccess,
          actions.createTodoItemFailure,
          actions.patchTodoItemSuccess,
          actions.patchTodoItemFailure,
          actions.deleteTodoItemSuccess,
          actions.deleteTodoItemFailure
        ]),
        tap((action: Action) => {
          this.snackBar.open(
            action.type,
            'x',
            { duration: 5000 }
          );
        }),
      ),
      { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private todoApiService: TodoApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
