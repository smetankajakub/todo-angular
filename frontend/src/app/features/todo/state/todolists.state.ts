import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoItem } from '../models/todo-item';

export interface EntityTodoList {
  id: number;
  title: string;
  items: TodoItem[];
  query: string;
  radio: string;
}
//   items: EntityState<TodoItem[]>;
  // 
export interface TodoListsState extends EntityState<EntityTodoList> {}

export const todoListAdapter: EntityAdapter<EntityTodoList> = createEntityAdapter<EntityTodoList>();

export const initialState: TodoListsState = todoListAdapter.getInitialState();

