import { TodoItem } from './todo-item';
// export interface TodoList {
//   id: number;
//   title?: string;
//   items: TodoItem[];
//   query?: string;
//   radio?: string;
// }

export class TodoList {
  public id: number;
  public title: string;
  public items: TodoItem[];
  public query: string;
  public radio: string;
  // private items: TodoItem;
  constructor() {
    this.id = 0;
    this.title = '';
    this.items = [];
    this.query = '';
    this.radio = '';
  }
}
