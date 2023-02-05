import { Action, createReducer, on } from '@ngrx/store';
import { initialState, todoListAdapter, TodoListsState } from './todolists.state';
import * as TodolistActions from './todolists.actions';

const _todoListsReducer = createReducer(
	initialState,
	on(TodolistActions.loadAllTodoListSuccess, (state, action) => {
		return todoListAdapter.setAll(action.todolists, state);
	}),
	on(TodolistActions.addNewTodoListSuccess, (state, action) => {
		return todoListAdapter.addOne(action.todoList, state);
	}),
	on(TodolistActions.updateTodoListSuccess, (state, action) => {
		return todoListAdapter.updateOne(action.todoList, state);
	}),
	on(TodolistActions.deleteTodoListSuccess, (state, action) => {
		return todoListAdapter.removeOne(action.todoListId, state);
	}),

	on(TodolistActions.addNewTodoItemSuccess, (state, action) => {
		return todoListAdapter.updateOne(action.todoList, state);
	}),
	on(TodolistActions.updateTodoItemSuccess, (state, action) => {
		return todoListAdapter.updateOne(action.todoList, state);
	}),
	on(TodolistActions.deleteTodoItemSuccess, (state, action) => {
		return todoListAdapter.updateOne(action.todoList, state);
	})
);

export function todoListsReducer(state: TodoListsState, action: Action) {
	return _todoListsReducer(state, action);
}
