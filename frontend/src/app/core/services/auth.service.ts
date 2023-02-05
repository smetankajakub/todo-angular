import {
	Auth,
	signOut,
	signInWithPopup,
	user,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	User,
	authState,
	GoogleAuthProvider,
	UserInfo
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { ApiUser } from './api/todo.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
export interface CustomUser extends UserInfo {
	apiId?: string;
}
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user$: Observable<User | null> | undefined;
	userData!: CustomUser; // Save logged in user data
	constructor(
		public router: Router,
		private auth: Auth,
		private firestore: Firestore,
		private http: HttpClient
	) {
		/* Saving user data in localstorage when 
    logged in and setting up null when logged out */
		this.user$ = user(auth);
		authState(auth).subscribe((user) => {
			if (user) {
				this.userData = user;
				window.localStorage.setItem('user', JSON.stringify(this.userData));
			} else {
				window.localStorage.removeItem('user');
			}
		});
	}
	// Sign in with email/password
	async signIn(email: string, password: string) {
		return await signInWithEmailAndPassword(this.auth, email, password)
			.then((userCredentials) => {
				this.user$ = of(userCredentials.user);
				this.router.navigate(['/todo/list']);
			})
			.catch((error) => {
				console.log('error code: ', error.code);
				console.log('errorMessage: ', error.message);
			});
	}

	async signUp(email: string, password: string) {
		return await createUserWithEmailAndPassword(this.auth, email, password)
			.then(async () => {
				this.createUser({
					name: this.userData.displayName
				} as ApiUser);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	get isLoggedIn(): boolean {
		const user = window.localStorage.getItem('user');
		if (user !== null) {
			return user !== null ? true : false;
		}
		return false;
	}

	async googleAuth() {
		return await signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
			this.userData = result.user;
			this.createUser({
				name: this.userData.displayName
			} as ApiUser);
		});
	}

	public getUserId(): string {
		const value = window.localStorage.getItem('apiId');
		return value !== null ? JSON.parse(value) : '';
	}

	async signOut() {
		return await signOut(this.auth).then(() => {
			window.localStorage.removeItem('user');
			this.router.navigate(['./identity/login']);
		});
	}

	createUser(user: ApiUser): void {
		this.http.post<ApiUser>(API_URL + 'users', user).subscribe((result) => {
			this.userData.apiId = result.apiId;
			window.localStorage.setItem('apiId', JSON.stringify(result.apiId));
			this.router.navigate(['/todo/list']);
		});
	}
}
