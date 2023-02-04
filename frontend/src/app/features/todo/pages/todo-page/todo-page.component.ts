import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import * as TodolistActions from '../../state/todolists.actions';
import { getTodoLists } from '../../state/todolists.selector';
import { EntityTodoList } from '../../state/todolists.state';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  todoLists$!: Observable<EntityTodoList[]>;
  todoLists: EntityTodoList[] = [];
  todoItem!: TodoItem;

  constructor(public dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoLists$ = this.todoService.getTodoLists();
  }
  createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
    this.todoService.createOrUpdateTodoList(flag, todoList);
  }
}
