import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { Observable } from "rxjs";

import { TodoApiService } from '../../services/todo-api.service';
import { TodoInterface } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todoList$: Observable<TodoInterface[]>;

  constructor(
    private todoApiService: TodoApiService
  ) { }

  public ngOnInit(): void {
    this.todoList$ = this.todoApiService.getTodoList();
  }

  public onGroupsChange(options: MatListOption[]): void {
    console.log(options);
  }

}
