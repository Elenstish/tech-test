import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent {
  public searchControl: FormControl = new FormControl('');

  constructor(
    private dialog: MatDialog
  ) { }

  public clear(): void {
    this.searchControl.setValue('');
  }

  public setSearch(): void {
    console.log(this.searchControl.value)
  }

  public openTodoDialog(): void {
    this.dialog.open(TodoDialogComponent, {
      width: '590px'
    });
  }

}
