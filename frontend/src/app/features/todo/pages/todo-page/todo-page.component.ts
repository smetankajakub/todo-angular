import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoItemDetailComponent } from '../../components/todo-item-detail/todo-item-detail.component';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  searchFilter: unknown = '';
  radio: unknown = '';
  todoLists: TodoList[] = [];
  todoItem!: TodoItem;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTodoLists();
  }

  getTodoLists(): void {
    this.apiService.getAllTodoLists().subscribe((todos) => {
      this.todoLists = todos;
    });
  }

  deleteTodoList(todoList: TodoList): void {
    this.todoLists = this.todoLists.filter((h) => h !== todoList);
    this.apiService.deleteTodoList(todoList.id).subscribe();
  }

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
        list: todoList !== undefined ? todoList : ({} as TodoList),
        flag: flag,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.todoLists.push(result);
      }
    });
  }
}
