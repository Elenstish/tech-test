import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TodoInterface } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  public apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(this.apiUrl + '/tasks');
  }
}
