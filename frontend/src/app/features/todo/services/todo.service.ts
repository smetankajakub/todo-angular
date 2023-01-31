import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoList } from '../models/todo-list';

@Injectable()
export class TodoService {
  constructor(private apiService: ApiService) {}

  getTodoLists(): Observable<TodoList[]> {
    return this.apiService.getAllTodoLists();
  }

  deleteTodoListById(todoListId: number): Observable<unknown> {
    return this.apiService.deleteTodoList(todoListId);
  }
}
