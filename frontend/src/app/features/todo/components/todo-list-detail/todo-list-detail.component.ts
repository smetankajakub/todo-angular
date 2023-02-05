import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import { EntityTodoList } from '../../state/todolists.state';

//TODO: Put to separate file, improve name to be more precious
export interface Data {
	list: TodoList;
	flag: string;
}

@Component({
	selector: 'app-todolist-detail',
	templateUrl: './todo-list-detail.component.html',
	styleUrls: ['./todo-list-detail.component.scss']
})
export class TodoListDetailComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<TodoListDetailComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: Data,
		public apiService: ApiService,
		public todoService: TodoService
	) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	save(todo: EntityTodoList, flag: string): void {
		this.dialogRef.close();
		if (flag === 'create') {
			return this.todoService.addNewTodo(todo);
		} else {
			return this.todoService.updateTodo(todo);
		}
	}

	ngOnInit(): void {}
}
