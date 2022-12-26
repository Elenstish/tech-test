import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TodoInterface } from '../../models/todo.model';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { TodoStoreService } from '../../store/services/todo-store.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  public todoItem$: Observable<TodoInterface>;
  private id: number;

  constructor(
    public dialog: MatDialog,
    private todoStoreService: TodoStoreService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params?.id;
    this.todoStoreService.getTodoItem(this.id);
    this.subscribeData();
  }

  public openTodoDialog(item: TodoInterface): void {
    this.dialog.open(TodoDialogComponent, {
      width: '590px',
      data: item
    });
  }

  public deleteTodo(id: number): void {
    this.todoStoreService.deleteTodoItem(id);
  }

  private subscribeData(): void {
    this.todoItem$ = this.todoStoreService.selectTodoItem$();
  }
}
