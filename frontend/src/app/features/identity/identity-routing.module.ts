import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
	{
		path: 'sign-up',
		component: SignUpComponent,
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'login'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IdentityRoutingModule {}
