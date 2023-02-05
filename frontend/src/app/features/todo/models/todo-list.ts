import { TodoItem } from './todo-item';

export interface TodoList {
	id: number;
	title: string;
	items: TodoItem[];
	query: string;
	radio: string;
}
