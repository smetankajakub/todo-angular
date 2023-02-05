import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoList } from '../models/todo-list';


export interface TodoListsState extends EntityState<TodoList> {}

export const todoListAdapter: EntityAdapter<TodoList> =
	createEntityAdapter<TodoList>();

export const initialState: TodoListsState = todoListAdapter.getInitialState();
