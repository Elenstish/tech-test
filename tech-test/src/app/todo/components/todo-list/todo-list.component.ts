import { Component, OnInit } from '@angular/core';

import { TodoApiService } from '../../services/todo-api.service';
import { TodoInterface } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    private todoApiService: TodoApiService
  ) { }

  ngOnInit(): void {
    this.todoApiService.getTodoList()
      .pipe(
      )
      .subscribe((list: TodoInterface[]) => {
        console.log('list', list)
      });
  }

}
