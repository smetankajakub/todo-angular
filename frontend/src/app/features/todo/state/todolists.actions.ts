import { createAction, props } from "@ngrx/store";
import { TodoList } from "../models/todo-list";
import { EntityTodoList } from "./todolists.state";


export const LOAD_ALL_TODO_LISTS = '[TODO LISTS] load all';
export const LOAD_ALL_TODO_LISTS_SUCCESS = '[TODO LISTS] load all successfully';

export const loadAllTodoLists = createAction(LOAD_ALL_TODO_LISTS);

export const loadAllTodoListSuccess = createAction(LOAD_ALL_TODO_LISTS_SUCCESS, props<{todolists: EntityTodoList[]}>());