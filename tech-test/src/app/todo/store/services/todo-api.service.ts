import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TodoInterface } from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  public apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.apiUrl}/tasks`);
  }

  getTodoItem(id: number): Observable<TodoInterface> {
    return this.http.get<TodoInterface>(`${this.apiUrl}/tasks/${id}`);
  }

  postTodoItem(item: TodoInterface): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(`${this.apiUrl}/tasks`, item);
  }

  patchTodoItem(item: TodoInterface): Observable<TodoInterface> {
    return this.http.patch<TodoInterface>(`${this.apiUrl}/tasks/${item.id}`, item);
  }

  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
