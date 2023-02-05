import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import { EntityTodoList } from '../../state/todolists.state';
@Component({
	selector: 'app-todo-page',
	templateUrl: './todo-page.component.html',
	styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
	todoLists$!: Observable<EntityTodoList[]>;
	todoLists: EntityTodoList[] = [];
	todoItem!: TodoItem;

	constructor(public dialog: MatDialog, private todoService: TodoService) {}

	ngOnInit(): void {
		this.todoLists$ = this.todoService.getTodoLists();
	}
	createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
		this.todoService.createOrUpdateTodoList(flag, todoList);
	}
}
