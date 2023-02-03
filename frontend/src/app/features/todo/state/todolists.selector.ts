import { todoListAdapter, TodoListsState } from './todolists.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const TODOLISTS_STATE_NAME = 'todo';
const getTodoListsState =
  createFeatureSelector<TodoListsState>(TODOLISTS_STATE_NAME);
export const todoListsSelectors = todoListAdapter.getSelectors();

export const getTodoLists = createSelector(getTodoListsState, todoListsSelectors.selectAll);
export const getTodoListsEntities = createSelector(
  getTodoListsState,
  todoListsSelectors.selectEntities
);
