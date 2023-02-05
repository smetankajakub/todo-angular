export interface TodoItem {
	id: number;
	todolistId: number;
	title: string;
	description: string;
	deadline: Date;
	done?: boolean;
}

// export class TodoItem {
//   constructor(
//     public id: number,
//     public title: string,
//     public description: string
//   ) {
//     id = 0;
//     title = '';
//     description = '';
//   }
// }
