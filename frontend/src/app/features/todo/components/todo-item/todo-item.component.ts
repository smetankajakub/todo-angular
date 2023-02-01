import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';

@Component({
  selector: 'todolist-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem!: TodoItem;
  @Input() todoList!: TodoList;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  deleteItem(todoListId: number, todoItemId: number): void {
    this.todoList.items = this.todoList.items.filter(
      (h) => h.id !== todoItemId
    );
    this.apiService.deleteItem(todoListId, todoItemId).subscribe();
  }

  toggleDoneStatus(todoListId: number, todoItem: TodoItem): void {
    todoItem.done = !todoItem.done;
    this.apiService.updateItem(todoListId, todoItem).subscribe();
  }

  openDialogEditTask(): void {
    const dialogRef = this.dialog.open(TodoItemComponent, {
      width: '500px',
      data: {
        item: this.todoItem,
        flag: 'update',
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.todoItem = result;
    });
  }
}