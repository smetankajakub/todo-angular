import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';
import { EntityTodoList } from '../../state/todolists.state';

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
	@Input() todoList!: EntityTodoList;
	constructor(public dialog: MatDialog, private todoService: TodoService) {}

	ngOnInit(): void {
		this.todoList = { ...this.todoList };
	}

	createOrUpdateTodoList(flag: string, todoList?: EntityTodoList): void {
		this.todoService.createOrUpdateTodoList(flag, todoList);
	}

	public deleteTodoList(todoList: EntityTodoList): void {
		this.todoService.deleteTodoListById(todoList.id);
	}

	public openDialogAddTask(): void {
		this.todoService.openDialogAddTask(this.todoList);
	}

	public filterChange(e: string): void {
		this.todoList.radio = e;
		this.todoService.updateTodo(this.todoList);
	}
}
