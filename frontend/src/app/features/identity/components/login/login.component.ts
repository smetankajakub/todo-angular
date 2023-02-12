import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	constructor(public authService: AuthService, public fb: FormBuilder) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			name: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	onSubmit(): void {
		this.authService.signIn(this.loginForm.value.name, this.loginForm.value.password);
	}
}
