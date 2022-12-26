import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { TodoStoreService } from '../../store/services/todo-store.service';
import { TodoInterface } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  public todoList$: Observable<TodoInterface[]>;

  constructor(
    private todoStoreService: TodoStoreService
  ) { }

  public ngOnInit(): void {
    this.todoStoreService.getTodoList();
    this.subscribeData();
  }

  public onGroupsChange(event: MatSelectionListChange): void {
    let item: TodoInterface = event.option.value;
    const done: string | boolean = (item.done) ? false : moment().format('DD-MM-YYYY');
    item = {...item, done};

    this.todoStoreService.patchTodo(item);
  }

  private subscribeData(): void {
    this.todoList$ = this.todoStoreService.selectTodoList$();
  }
}
