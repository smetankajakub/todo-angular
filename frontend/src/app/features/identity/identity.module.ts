import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IdentityRoutingModule } from './identity-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, SharedModule],
	exports: [IdentityRoutingModule]
})
export class IdentityModule {}
