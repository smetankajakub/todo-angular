import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { TodoList } from '../models/todo-list';
import { EntityTodoList } from './todolists.state';

export const LOAD_ALL_TODO_LISTS = '[TODO LISTS] load all';
export const LOAD_ALL_TODO_LISTS_SUCCESS = '[TODO LISTS] load all successfully';
export const ADD_NEW_TODO_LIST = '[TODO LIST] add new list';
export const ADD_NEW_TODO_LIST_SUCCESS =
  '[TODO LIST] add new list successfully';
export const UPDATE_TODO_LIST = '[TODO LIST] update existing list';
export const UPDATE_TODO_LIST_SUCCESS =
  '[TODO LIST] update existing list successfully';
export const DELETE_TODO_LIST = '[TODO LIST] delete';
export const DELETE_TODO_LIST_SUCCESS = '[TODO LIST] delete list successfully';

export const loadAllTodoLists = createAction(LOAD_ALL_TODO_LISTS);
export const loadAllTodoListSuccess = createAction(
  LOAD_ALL_TODO_LISTS_SUCCESS,
  props<{ todolists: EntityTodoList[] }>()
);

export const addNewTodoList = createAction(
  ADD_NEW_TODO_LIST,
  props<{ todoList: EntityTodoList }>()
);

export const addNewTodoListSuccess = createAction(
  ADD_NEW_TODO_LIST_SUCCESS,
  props<{ todoList: EntityTodoList }>()
);

export const updateTodoList = createAction(
  UPDATE_TODO_LIST,
  props<{ todoList: EntityTodoList }>()
);

export const updateTodoListSuccess = createAction(
  UPDATE_TODO_LIST_SUCCESS,
  props<{ todoList: Update<EntityTodoList> }>()
);

export const deleteTodoList = createAction(
  DELETE_TODO_LIST,
  props<{ todoListId: number }>()
);

export const deleteTodoListSuccess = createAction(
  DELETE_TODO_LIST_SUCCESS,
  props<{ todoListId: number }>()
);
