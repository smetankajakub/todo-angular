import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../models/todo-item';
import { TodoList } from '../models/todo-list';

export const LOAD_ALL_TODO_LISTS = '[TODO LISTS] load all';
export const LOAD_ALL_TODO_LISTS_SUCCESS = '[TODO LISTS] load all successfully';
export const ADD_NEW_TODO_LIST = '[TODO LIST] add new list';
export const ADD_NEW_TODO_LIST_SUCCESS = '[TODO LIST] add new list successfully';
export const UPDATE_TODO_LIST = '[TODO LIST] update existing list';
export const UPDATE_TODO_LIST_SUCCESS = '[TODO LIST] update existing list successfully';
export const DELETE_TODO_LIST = '[TODO LIST] delete';
export const DELETE_TODO_LIST_SUCCESS = '[TODO LIST] delete list successfully';

export const ADD_NEW_TODO_ITEM = '[TODO LIST ITEM] add new item';
export const ADD_NEW_TODO_ITEM_SUCCESS = '[TODO LIST ITEM] add new item successfully';
export const UPDATE_TODO_ITEM = '[TODO LIST] update existing item';
export const UPDATE_TODO_ITEM_SUCCESS = '[TODO LIST ITEM] update existing item successfully';
export const DELETE_TODO_ITEM = '[TODO LIST ITEM] delete item';
export const DELETE_TODO_ITEM_SUCCESS = '[TODO LIST ITEM] delete item successfully';
export const loadAllTodoLists = createAction(LOAD_ALL_TODO_LISTS);
export const loadAllTodoListSuccess = createAction(
	LOAD_ALL_TODO_LISTS_SUCCESS,
	props<{ todolists: TodoList[] }>()
);

export const addNewTodoList = createAction(ADD_NEW_TODO_LIST, props<{ todoList: TodoList }>());

export const addNewTodoListSuccess = createAction(
	ADD_NEW_TODO_LIST_SUCCESS,
	props<{ todoList: TodoList }>()
);

export const updateTodoList = createAction(UPDATE_TODO_LIST, props<{ todoList: TodoList }>());

export const updateTodoListSuccess = createAction(
	UPDATE_TODO_LIST_SUCCESS,
	props<{ todoList: Update<TodoList> }>()
);

export const deleteTodoList = createAction(DELETE_TODO_LIST, props<{ todoListId: number }>());

export const deleteTodoListSuccess = createAction(
	DELETE_TODO_LIST_SUCCESS,
	props<{ todoListId: number }>()
);

export const addNewTodoItem = createAction(
	ADD_NEW_TODO_ITEM,
	props<{ todoList: TodoList; todoItem: TodoItem }>()
);

export const addNewTodoItemSuccess = createAction(
	ADD_NEW_TODO_ITEM_SUCCESS,
	props<{ todoList: Update<TodoList> }>()
);

export const updateTodoItem = createAction(
	UPDATE_TODO_ITEM,
	props<{ todoList: TodoList; todoItem: TodoItem }>()
);

export const updateTodoItemSuccess = createAction(
	UPDATE_TODO_ITEM_SUCCESS,
	props<{ todoList: Update<TodoList> }>()
);

export const deleteTodoItem = createAction(
	DELETE_TODO_ITEM,
	props<{ todoList: TodoList; todoItem: TodoItem }>()
);

export const deleteTodoItemSuccess = createAction(
	DELETE_TODO_ITEM_SUCCESS,
	props<{ todoList: Update<TodoList> }>()
);
