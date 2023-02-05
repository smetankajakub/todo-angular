/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../../../features/todo/models/todo-item';
import { TodoList } from '../../../features/todo/models/todo-list';
import { AuthService } from '../auth.service';

export interface ApiUser {
	apiId?: string;
	name: string;
}
const API_URL = environment.apiUrl;
@Injectable({
	providedIn: 'root'
})
export class ApiService {
	log: any = '';
	private TODO_LISTS_URL: string = API_URL + 'users/' + this.auth.getUserId() + '/';
	
	constructor(private http: HttpClient, private auth: AuthService) {}
	
	////////////////////////////////////////////TODO LIST ///////////////////////////////////////////////////
	// GET -all todolists from mockapi.io
	// GET /todolist
	getAllTodoLists(): Observable<TodoList[]> {
		return this.http
			.get<TodoList[]>(this.TODO_LISTS_URL + 'todolist')
			.pipe(catchError(this.handleError<TodoList[]>('getAllTodoLists', [])));
	}

	// POST
	// /todolist
	addTodoList(todoList: TodoList): Observable<TodoList> {
		return this.http
			.post<TodoList>(this.TODO_LISTS_URL + 'todolist', todoList)
			.pipe(catchError(this.handleError('addTodoList', todoList)));
	}

	// GET
	// /todolist/:id
	getTodoList(todoListId: number): Observable<TodoList> {
		return this.http
			.get<TodoList>(this.TODO_LISTS_URL + 'todolist' + todoListId)
			.pipe(catchError(this.handleError<TodoList>('getTodoList')));
	}
	// PUT
	// /todolist/:id
	updateTodoList(todoList: TodoList): Observable<TodoList> {
		return this.http
			.put<TodoList>(this.TODO_LISTS_URL + 'todolist/' + todoList.id, todoList)
			.pipe(catchError(this.handleError('updateTodoList', todoList)));
	}
	// DELETE
	// /todolist/:id
	deleteTodoList(todoListId: number): Observable<unknown> {
		return this.http
			.delete(this.TODO_LISTS_URL + 'todolist/' + todoListId)
			.pipe(catchError(this.handleError('deleteItem', todoListId)));
	}
	//////////////////////////////////////// TODOLIST ITEM ////////////////////////////////////////////////////////////
	// POST
	// /todolist/:id/item
	addItemToList(id: number, todoItem: TodoItem): Observable<TodoItem> {
		return this.http
			.post<TodoItem>(this.TODO_LISTS_URL + 'todolist/' + id + '/item', todoItem)
			.pipe(catchError(this.handleError('addItem', todoItem)));
	}

	//  GET
	// /todolist/:id/item
	getAllTodoListItems(todoListId: number): Observable<TodoItem[]> {
		return this.http
			.get<TodoItem[]>(this.TODO_LISTS_URL + 'todolist/' + todoListId + '/item')
			.pipe(catchError(this.handleError<TodoItem[]>('getAllTodoLists', [])));
	}

	// GET
	// /todolist/:id/item/:id
	getSingleTodoItem(todoListId: number, todoItemId: number): Observable<TodoItem> {
		return this.http
			.get<TodoItem>(this.TODO_LISTS_URL + 'todolist/' + todoListId + '/item/' + todoItemId)
			.pipe(catchError(this.handleError<TodoItem>('getSingleItem')));
	}

	// PUT
	// /todolist/:id/item/:id
	updateItem(todoListId: number, todoItem: TodoItem): Observable<TodoItem> {
		return this.http
			.put<TodoItem>(
				this.TODO_LISTS_URL + 'todolist/' + todoListId + '/item/' + todoItem.id,
				todoItem
			)
			.pipe(catchError(this.handleError('updateItem', todoItem)));
	}

	// DELETE
	// /todolist/:id/item/:id
	deleteItem(todoListId: number, todoItemId: number): Observable<unknown> {
		return this.http
			.delete(this.TODO_LISTS_URL + 'todolist/' + todoListId + '/item/' + todoItemId)
			.pipe(catchError(this.handleError('deleteItem', todoItemId)));
	}

	handleError<T>(operation = 'operation', result?: T) {
		return (error: HttpErrorResponse): Observable<T> => {
			if (error.status === 404) {
				alert('endpoint not found');
			}
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
