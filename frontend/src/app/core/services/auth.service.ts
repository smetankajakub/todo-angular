import {
	Auth,
	signOut,
	signInWithPopup,
	user,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	User,
	authState,
	GoogleAuthProvider,
	UserInfo
} from '@angular/fire/auth';

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { doc, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user$: Observable<User | null> | undefined;
	userData!: UserInfo; // Save logged in user data
	constructor(
		public router: Router,
		public ngZone: NgZone, // NgZone service to remove outside scope warning
		private auth: Auth,
		private firestore: Firestore
	) {
		/* Saving user data in localstorage when 
    logged in and setting up null when logged out */
		this.user$ = user(auth);
		authState(auth).subscribe((user) => {
			console.log('in auth state', user);
			// if (user) {
			// 	this.userData = user;
			// 	this.ls.set('user', this.userData);
			// } else {
			// 	this.ls.set('user', 'null');
			// }
		});
	}
	// Sign in with email/password
	async signIn(email: string, password: string) {
		return await signInWithEmailAndPassword(this.auth, email, password)
			.then((userCredentials) => {
				this.user$ = of(userCredentials.user);
				this.setUserData(userCredentials.user);
				this.router.navigate(['/']);
			})
			.catch((error) => {
				console.log('error code: ', error.code);
				console.log('errorMessage: ', error.message);
			});
	}

	async signUp(email: string, password: string) {
		return await createUserWithEmailAndPassword(this.auth, email, password)
			.then((response) => {
				this.sendVerificationMail();
				this.setUserData(response.user);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	// Send email verfificaiton when new user sign up
	async sendVerificationMail() {
		const user = this.auth.currentUser;
		if (user !== null) {
			return await sendEmailVerification(user);
		}
	}
	get isLoggedIn(): boolean {
		return true;
		// const user = this.localStorage.get('user') as User;
		// return user !== null && user.emailVerified !== false ? true : false;
	}
	// Sign in with Google
	async googleAuth() {
		return await signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
			this.userData = result.user;
			// this.ls.set('user', this.userData);
			this.router.navigate(['/todolists']);
		});
	}

	async setUserData(user: User) {
		const userRef: DocumentReference<DocumentData> = doc(this.firestore, `users/${user.uid}`);
		const userData: UserInfo = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			phoneNumber: '',
			providerId: user.providerId
		};
		return await setDoc(userRef, userData, { merge: true });
	}

	async signOut() {
		return await signOut(this.auth).then(() => {
			// this.ls.remove('user');
			this.router.navigate(['./auth/login']);
		});
	}
}
