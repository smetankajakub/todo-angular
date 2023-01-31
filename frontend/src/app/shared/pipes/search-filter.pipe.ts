import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from 'src/app/features/todo/models/todo-item';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (data: TodoItem) {
      return data.description.toLowerCase().includes(args) || data.title.toLowerCase().includes(args);
    });
  }
}
