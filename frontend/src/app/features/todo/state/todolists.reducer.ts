import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { initialState, todoListAdapter, TodoListsState } from './todolists.state';
import * as TodolistActions from './todolists.actions';

const _todoListsReducer = createReducer(
  initialState,
  on(TodolistActions.loadAllTodoListSuccess, (state, action) => {
    // return todoListAdapter.setAll(action., state);
    console.log(action)
    console.log(state)
    return todoListAdapter.setAll(action.todolists, state);
  })
);

export const getTodoLists = createSelector(
    todoListAdapter.getInitialState,
    todoListAdapter.getSelectors().selectAll
)
export function todoListsReducer(state: TodoListsState | undefined, action: Action) {
  return _todoListsReducer(state, action);
}
