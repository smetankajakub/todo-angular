import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoItemDetailComponent } from '../components/todo-item-detail/todo-item-detail.component';
import { TodoListDetailComponent } from '../components/todo-list-detail/todo-list-detail.component';
import { TodoItem } from '../models/todo-item';
import { TodoList } from '../models/todo-list';
import * as TodolistActions from '../state/todolists.actions';
import { getTodoLists } from '../state/todolists.selector';
@Injectable()
export class TodoService {
	constructor(private store: Store, private dialog: MatDialog) {}

	getTodoLists(): Observable<TodoList[]> {
		this.store.dispatch(TodolistActions.loadAllTodoLists());
		return this.store.select(getTodoLists);
	}

	addNewTodo(todoList: TodoList): void {
		this.store.dispatch(TodolistActions.addNewTodoList({ todoList }));
	}

	updateTodo(todoList: TodoList): void {
		this.store.dispatch(TodolistActions.updateTodoList({ todoList }));
	}

	deleteTodoListById(todoListId: number): void {
		this.store.dispatch(TodolistActions.deleteTodoList({ todoListId }));
	}

	createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
		const todoListCopy = { ...todoList };
		const dialogRef = this.dialog.open(TodoListDetailComponent, {
			width: '500px',
			data: {
				list: todoListCopy !== undefined ? todoListCopy : ({} as TodoList),
				flag: flag
			}
		});

		dialogRef.afterClosed().subscribe((result) => {
			return result;
		});
	}

	public openDialogAddTask(todoList: TodoList): void {
		this.dialog.open(TodoItemDetailComponent, {
			width: '500px',
			data: {
				list: todoList,
				item: {} as TodoItem,
				flag: 'create',
				id: todoList.id
			}
		});
	}

	public addNewItem(todoList: TodoList, todoItem: TodoItem): void {
		this.store.dispatch(TodolistActions.addNewTodoItem({ todoList, todoItem }));
	}

	public updateItem(todoList: TodoList, todoItem: TodoItem): void {
		this.store.dispatch(TodolistActions.updateTodoItem({ todoList, todoItem }));
	}

	public deleteItem(todoList: TodoList, todoItem: TodoItem): void {
		this.store.dispatch(TodolistActions.deleteTodoItem({ todoList, todoItem }));
	}
}
