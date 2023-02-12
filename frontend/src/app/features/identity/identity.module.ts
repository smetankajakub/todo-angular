import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { IdentityRoutingModule } from './identity-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [LoginComponent, SignUpComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,

		MatSliderModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatGridListModule,
		MatCheckboxModule,
		MatDialogModule
	],
	exports: [IdentityRoutingModule]
})
export class IdentityModule {}
