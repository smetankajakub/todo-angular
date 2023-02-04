import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import { EntityTodoList } from '../../state/todolists.state';
import { TodoItemDetailComponent } from '../todo-item-detail/todo-item-detail.component';

@Component({
  selector: 'todolist-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem!: TodoItem;
  @Input() todoList!: EntityTodoList;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private todoService: TodoService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  deleteItem(todoListId: number, todoItemId: number): void {
    //   this.todoList.items = this.todoList.items.filter(
    //     (h) => h.id !== todoItemId
    //   );
    //   this.apiService.deleteItem(todoListId, todoItemId).subscribe();
  }

  toggleDoneStatus(todoListId: number, todoItem: TodoItem): void {
    todoItem.done = !todoItem.done;
    this.apiService.updateItem(todoListId, todoItem).subscribe();
  }

  openDialogEditTask(): void {
    const dialogRef = this.dialog.open(TodoItemDetailComponent, {
      width: '500px',
      data: {
        item: { ...this.todoItem },
        flag: 'update',
        todoList: this.todoList
      },
    });
  }
}
