import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';

@Component({
	selector: 'app-todo-item-detail',
	templateUrl: './todo-item-detail.component.html',
	styleUrls: ['./todo-item-detail.component.scss']
})
export class TodoItemDetailComponent implements OnInit {
	todoItemDetailForm!: FormGroup;
	constructor(
		public dialogRef: MatDialogRef<TodoItemDetailComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			list: TodoList;
			item: TodoItem;
			flag: string;
			id: number;
		},
		public todoService: TodoService,
		public fb: FormBuilder
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
	save(item: TodoItem, todoList: TodoList): void {
		if (this.data.flag === 'create') {
			this.todoService.addNewItem(todoList, item);
		} else {
			this.todoService.updateItem(todoList, item);
		}
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.data.item = { id: this.data.item.id, ...this.todoItemDetailForm.value } as TodoItem;
		this.save(this.data.item, this.data.list);
	}
	ngOnInit(): void {
		this.todoItemDetailForm = this.fb.group({
			title: [this.data.item.title, [Validators.required, Validators.minLength(1)]],
			description: [this.data.item.description, [Validators.required, Validators.minLength(1)]],
			deadline: [this.data.item.deadline, [Validators.required]],
			done: [this.data.item.done]
		});
	}
}
