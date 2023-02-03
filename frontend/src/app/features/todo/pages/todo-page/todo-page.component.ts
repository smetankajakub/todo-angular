import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoItemDetailComponent } from '../../components/todo-item-detail/todo-item-detail.component';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import * as TodolistActions from '../../state/todolists.actions';
import { getTodoLists } from '../../state/todolists.selector';
import { EntityTodoList } from '../../state/todolists.state';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  searchFilter: unknown = '';
  radio: unknown = '';
  todoLists$!: Observable<EntityTodoList[]>;
  todoItem!: TodoItem;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TodolistActions.loadAllTodoLists());
    this.todoLists$ = this.store.select(getTodoLists)
    
  }

  // deleteTodoList(todoList: TodoList): void {
  //   this.todoLists = this.todoLists.filter((h) => h !== todoList);
  //   this.apiService.deleteTodoList(todoList.id).subscribe();
  // }

  filterChange(e: string): void {
    this.radio = e;
  }

  openDialogAddTask(todoList: TodoList): void {
    const dialogRef = this.dialog.open(TodoItemDetailComponent, {
      width: '500px',
      data: {
        item: this.todoItem,
        flag: 'create',
        id: todoList.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        todoList.items.push(result);
      }
    });
  }

  createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
    const dialogRef = this.dialog.open(TodoItemDetailComponent, {
      width: '500px',
      data: {
        list: todoList !== undefined ? todoList : new TodoList(),
        flag: flag,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result !== undefined) {
    //     this.todoLists.push(result);
    //   }
    // });
  }
}
