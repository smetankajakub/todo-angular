import { createAction, props } from '@ngrx/store';
import { TodoList } from '../../models/todo-list';

export const addNewTodoList = createAction(
  '[TodoList] CREATE new TodoList',
  props<{ todoList: TodoList }>()
);

export const removeTodoList = createAction(
  '[TodoList] DELETE existing TodoList',
  props<{ todoListId: string }>()
);
