import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import { TodoItemDetailComponent } from '../todo-item-detail/todo-item-detail.component';

@Component({
	selector: 'app-todolist-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
	@Input() todoItem!: TodoItem;
	@Input() todoList!: TodoList;

	constructor(public dialog: MatDialog, private todoService: TodoService) {}

	ngOnInit(): void {}

	deleteItem(): void {
		this.todoService.deleteItem(this.todoList, this.todoItem);
	}

	openDialogEditTask(): void {
		this.dialog.open(TodoItemDetailComponent, {
			width: '500px',
			data: {
				item: this.todoItem,
				flag: 'update',
				list: this.todoList
			}
		});
	}
}
