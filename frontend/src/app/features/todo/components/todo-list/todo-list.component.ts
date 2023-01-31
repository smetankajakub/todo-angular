import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoList } from '../../models/todo-list';
import { TodoService } from '../../services/todo.service';
import { TodoItemDetailComponent } from '../todo-item-detail/todo-item-detail.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todoList!: TodoList;
  radio: string = '';
  // radioOptions: any = [
  //   {
  //     name: 'All',
  //     value: '',
  //     checked: true,
  //   },
  //   {
  //     name: 'Active',
  //     value: false,
  //     checked: false,
  //   },
  //   {
  //     name: 'Done',
  //     value: true,
  //     checked: false,
  //   },
  // ];
  constructor(public dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {}

  createOrUpdateTodoList(flag: string, todoList?: TodoList): void {
    const dialogRef = this.dialog.open(TodoListComponent, {
      width: '500px',
      data: {
        list: todoList !== undefined ? todoList : ({} as TodoList),
        flag: flag,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        // this.todoLists.push(result);
      }
    });
  }

  public deleteTodoList(todoList: TodoList): void {
    this.todoService.deleteTodoListById(todoList.id);
  }

  public openDialogAddTask(todoList: TodoList): void {
    const dialogRef = this.dialog.open(TodoItemDetailComponent, {
      width: '500px',
      data: {
        // item: this.todoItem,
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

  public filterChange(e: any): void {
    console.log('filterChange', e);
    this.radio = e;
  }
}
