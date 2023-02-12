import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api/todo.service';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';

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
	todoListDetailForm!: FormGroup;
	constructor(
		public dialogRef: MatDialogRef<TodoListDetailComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: Data,
		public apiService: ApiService,
		public todoService: TodoService,
		public fb: FormBuilder
	) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	save(todo: TodoList): void {
		this.dialogRef.close();
		if (this.data.flag === 'create') {
			return this.todoService.addNewTodo(todo);
		} else {
			return this.todoService.updateTodo(todo);
		}
	}

	onSubmit(): void {
		this.data.list.title = this.todoListDetailForm.value.title;
		this.save(this.data.list);
	}
	ngOnInit(): void {
		this.todoListDetailForm = this.fb.group({
			title: [this.data.list.title, [Validators.required, Validators.minLength(1)]]
		});
	}
}
