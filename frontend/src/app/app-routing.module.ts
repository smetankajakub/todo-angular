import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{
		path: 'todo',
		loadChildren: () => import('./features/todo/todo.module').then((m) => m.TodoModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'identity',
		loadChildren: () =>
			import('./features/identity/identity.module').then((m) => m.IdentityModule)
	},
	{
		path: '**',
		redirectTo: 'identity'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
