import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
	signUpForm!: FormGroup;
	constructor(public authService: AuthService, public fb: FormBuilder) {}

	ngOnInit(): void {
		this.signUpForm = this.fb.group({
			name: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	onSubmit(): void {
		this.authService.signUp(this.signUpForm.value.name, this.signUpForm.value.password);
	}
}
