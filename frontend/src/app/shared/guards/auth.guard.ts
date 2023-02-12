import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(public authService: AuthService, public router: Router) {}
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.isLoggedIn !== true) {
			this.router.navigate(['./identity/login']);
		}
		return true;
	}
}
