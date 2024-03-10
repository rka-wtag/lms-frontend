import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        RouterLinkActive,
        NgIf,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatError
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.onLogin(this.loginForm.value).subscribe({
                next: () => {
                    this.router.navigate(['showBooks']);
                },
                error: (err) => {
                    this.handleError(err);
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    goToRegistration() {
        this.router.navigate(['register'])
    }

    private handleError(err: HttpErrorResponse): void {
        if (err.status === 400) {
            this.loginForm.setErrors({"badCredentials": true, "badCredentialsMessage": err.error.errorMessage});
        }
    }
}

