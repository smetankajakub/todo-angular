import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
@Component({
	selector: 'app-todo-page',
	templateUrl: './todo-page.component.html',
	styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
	todoLists$!: Observable<TodoList[]>;
	todoLists: TodoList[] = [];
	todoItem!: TodoItem;

	constructor(public dialog: MatDialog, private todoService: TodoService, public auth: AuthService) {}

	ngOnInit(): void {
		this.todoLists$ = this.todoService.getTodoLists();
	}
	createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
		this.todoService.createOrUpdateTodoList(flag, todoList);
	}
}
