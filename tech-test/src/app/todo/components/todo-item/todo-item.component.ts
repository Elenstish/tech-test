import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TodoInterface } from '../../models/todo.model';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input()
  public item: TodoInterface;

  constructor(
    private dialog: MatDialog
  ) { }

  public openTodoDialog(item: TodoInterface): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(TodoDialogComponent, {
      width: '590px',
      data: item
    });
  }

  public deleteTodo(id: number): void {
    console.log('id', id);
  }

}
