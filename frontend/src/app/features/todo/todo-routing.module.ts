import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

const routes: Routes = [
	{
		path: 'list',
		component: TodoPageComponent
	},
	{
		path: '**',
		redirectTo: 'list'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TodoRoutingModule {}
