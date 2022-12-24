import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';

import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { TodoStoreService } from '../../store/services/todo-store.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterComponent {
  public searchControl: FormControl = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private todoStoreService: TodoStoreService
  ) { }

  public clear(): void {
    this.searchControl.setValue('');
    this.todoStoreService.filteredTodoList(this.searchControl.value);
  }

  public setSearch(): void {
    this.todoStoreService.filteredTodoList(this.searchControl.value);
  }

  public openTodoDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '590px'
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        take(1)
      )
      .subscribe(() => this.todoStoreService.getTodoList());
  }

}
