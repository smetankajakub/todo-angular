import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
// import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(public authService: AuthService, public router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.isLoggedIn !== true) {
			this.router.navigate(['./identity/login']);
		}
		return true;
	}
}
