export interface TodoItem {
  id: number;
  todolistId: number;
  title: string;
  description: string;
  deadline: Date;
  done?: boolean;
}
