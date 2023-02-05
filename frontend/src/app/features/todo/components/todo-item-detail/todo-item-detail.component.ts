import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import { EntityTodoList } from '../../state/todolists.state';

@Component({
	selector: 'app-todo-item-detail',
	templateUrl: './todo-item-detail.component.html',
	styleUrls: ['./todo-item-detail.component.scss']
})
export class TodoItemDetailComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<TodoItemDetailComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			list: TodoList;
			item: TodoItem;
			flag: string;
			id: number;
		},
		public todoService: TodoService
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
	save(item: TodoItem, flag: string, id: number, todoList: EntityTodoList): void {
		if (flag === 'create') {
			this.todoService.addNewItem(todoList, item);
		} else {
			this.todoService.updateItem(todoList, item);
		}
		this.dialogRef.close();
	}
	ngOnInit(): void {}
}
