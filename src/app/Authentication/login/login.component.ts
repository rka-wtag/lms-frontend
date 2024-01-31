import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        RouterLinkActive,
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.onLogin(this.loginForm.value).subscribe({
                next: () => {
                    this.router.navigate(['home']);
                },
                error: (err: HttpErrorResponse) => {
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

    private handleError(err: any): void {
        if (err.status === 'BAD_REQUEST') {
            this.loginForm.setErrors({"badCredentials": true, "badCredentialsMessage": err.message});
            console.log(this.loginForm.errors);
        }
    }
}

