import { Injectable } from '@angular/core';

import { mergeMap, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodolistActions from './todolists.actions';
import { ApiService } from 'src/app/core/services/api/todo.service';
import { TodoList } from '../models/todo-list';
import { Update } from '@ngrx/entity';

@Injectable()
export class TodoListsEffects {
	constructor(private actions$: Actions, private apiService: ApiService) {}

	loadAllTodoLists$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.loadAllTodoLists),
			mergeMap(() =>
				this.apiService.getAllTodoLists().pipe(
					map((todolists) => {
						return TodolistActions.loadAllTodoListSuccess({ todolists });
					})
				)
			)
		);
	});

	addNewTodoList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.addNewTodoList),
			mergeMap((action) => {
				return this.apiService.addTodoList(action.todoList).pipe(
					map((data) => {
						const todoList = { ...action.todoList, id: data.id };
						return TodolistActions.addNewTodoListSuccess({ todoList });
					})
				);
			})
		);
	});

	updateTodoList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.updateTodoList),
			switchMap((action) => {
				return this.apiService.updateTodoList(action.todoList).pipe(
					map(() => {
						const updatedTodoList: Update<TodoList> = {
							id: action.todoList.id,
							changes: {
								...action.todoList
							}
						};
						return TodolistActions.updateTodoListSuccess({
							todoList: updatedTodoList
						});
					})
				);
			})
		);
	});

	deleteTodoList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.deleteTodoList),
			switchMap((action) => {
				return this.apiService.deleteTodoList(action.todoListId).pipe(
					map(() => {
						return TodolistActions.deleteTodoListSuccess({
							todoListId: action.todoListId
						});
					})
				);
			})
		);
	});

	addNewTodoItem$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.addNewTodoItem),
			mergeMap((action) => {
				return this.apiService.addItemToList(action.todoList.id, action.todoItem).pipe(
					map(() => {
						const updatedTodoList: Update<TodoList> = {
							id: action.todoList.id,
							changes: {
								items:
									action.todoList.items !== undefined
										? [...action.todoList.items, action.todoItem]
										: [action.todoItem]
							}
						};
						return TodolistActions.addNewTodoItemSuccess({
							todoList: updatedTodoList
						});
					})
				);
			})
		);
	});

	updateTodoItem$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.updateTodoItem),
			mergeMap((action) => {
				return this.apiService.updateItem(action.todoList.id, action.todoItem).pipe(
					map(() => {
						const index = action.todoList.items.findIndex(
							(item) => item.id === action.todoItem.id
						);
						const copy = [...action.todoList.items];
						copy.splice(index, 1);
						const updatedTodoList: Update<TodoList> = {
							id: action.todoList.id,
							changes: {
								items: [...copy, action.todoItem]
							}
						};
						return TodolistActions.updateTodoItemSuccess({
							todoList: updatedTodoList
						});
					})
				);
			})
		);
	});

	deleteTodoItem$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TodolistActions.deleteTodoItem),
			mergeMap((action) => {
				return this.apiService.deleteItem(action.todoList.id, action.todoItem.id).pipe(
					map(() => {
						const index = action.todoList.items.findIndex(
							(item) => item.id === action.todoItem.id
						);
						const copy = [...action.todoList.items];
						copy.splice(index, 1);
						const updatedTodoList: Update<TodoList> = {
							id: action.todoList.id,
							changes: {
								items: [...copy]
							}
						};
						return TodolistActions.deleteTodoItemSuccess({
							todoList: updatedTodoList
						});
					})
				);
			})
		);
	});
}
