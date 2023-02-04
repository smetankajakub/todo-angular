import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from '../../models/todo-item';
import { TodoList } from '../../models/todo-list';

@Component({
  selector: 'app-todo-item-detail',
  templateUrl: './todo-item-detail.component.html',
  styleUrls: ['./todo-item-detail.component.scss'],
})
export class TodoItemDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TodoItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      list: TodoList;
      item: TodoItem;
      flag: string;
      id: number;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(item: TodoItem, flag: string, id: number): void {
    console.log(item);
    console.log(flag);
    console.log(id);
    console.log(this.data);

    
    // if (flag === 'create') {
    //   // return this.todoService.updateTodo(list);
    //   this.apiService.addItemToList(id, item).subscribe((todoItem) => {
    //     this.dialogRef.close(todoItem);
    //   });
    // } else {
    //   this.apiService.updateItem(item.todolistId, item).subscribe(() => {
    //   });
    // }
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
