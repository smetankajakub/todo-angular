import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from 'src/app/features/todo/models/todo-item';
// import { TodoItem } from 'src/app/features/todo/models/todo-item';
@Pipe({
	name: 'radioFilter'
})
export class RadioFilterPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		if (!value) return null;
		if (!args) return value;

		args = args === 'true' ? true : false;
		return value.filter(function (item: TodoItem) {
			return item.done === args || (item.done === undefined && args === false);
		});
	}
}
