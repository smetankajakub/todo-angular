import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { TodoList } from '../../models/todo-list';
import * as TodoListActions from '../actions/todo-list.actions';
export interface State extends EntityState<TodoList> {}

export const adapter: EntityAdapter<TodoList> = createEntityAdapter<TodoList>(
  {}
);

export const initialState: State = adapter.getInitialState({});
export const todoListReducer = createReducer(initialState);

export const reducer = createReducer(
  initialState,
  on(TodoListActions.addNewTodoList, (state, { todoList }) =>
    adapter.addOne(todoList, state)
  ),
  on(TodoListActions.removeTodoList, (state, { todoListId }) =>
    adapter.removeOne(todoListId, state)
  )
);
