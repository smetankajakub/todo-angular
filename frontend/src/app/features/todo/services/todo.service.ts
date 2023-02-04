import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoItemDetailComponent } from '../components/todo-item-detail/todo-item-detail.component';
import { TodoListDetailComponent } from '../components/todo-list-detail/todo-list-detail.component';
import { TodoItem } from '../models/todo-item';
import { TodoList } from '../models/todo-list';
import * as TodolistActions from '../state/todolists.actions';
import { getTodoLists } from '../state/todolists.selector';
import { EntityTodoList } from '../state/todolists.state';
@Injectable()
export class TodoService {
  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  getTodoLists(): Observable<EntityTodoList[]> {
    this.store.dispatch(TodolistActions.loadAllTodoLists());
    return this.store.select(getTodoLists);
  }

  addNewTodo(todoList: EntityTodoList): void {
    this.store.dispatch(TodolistActions.addNewTodoList({ todoList }));
    // return this.store.select(getTodoLists);
  }
  updateTodo(todoList: EntityTodoList): void {
    console.log('update todo');
    this.store.dispatch(TodolistActions.updateTodoList({ todoList }));
  }
  deleteTodoListById(todoListId: number): void {
    this.store.dispatch(TodolistActions.deleteTodoList({ todoListId }));
    // return this.apiService.deleteTodoList(todoListId);
  }

  createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
    const todoListCopy = { ...todoList };
    const dialogRef = this.dialog.open(TodoListDetailComponent, {
      width: '500px',
      data: {
        list: todoListCopy !== undefined ? todoListCopy : ({} as TodoList),
        flag: flag,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      return result;
    });
  }

  public openDialogAddTask(todoList: EntityTodoList): void {
    const dialogRef = this.dialog.open(TodoItemDetailComponent, {
      width: '500px',
      data: {
        item: {} as TodoItem,
        flag: 'create',
        id: todoList.id,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result !== undefined) {
    //     todoList.items.push(result);
    //   }
    // });
  }
}
