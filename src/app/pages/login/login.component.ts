import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FireBaseProvider } from '../../../providers/firebase.provider';
import { Router } from '@angular/router';
import { emailDomainValidator } from "../../validators/custom-email-domain.validator";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl<string>('', [Validators.required, Validators.email, emailDomainValidator('werkbeoordeelisator.nl')]),
        password: new FormControl<string>('', [Validators.required])
    });
    loginFailed = false;
    loading = false;     // TODO: Implement loading spinner
    submitted = false;

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    constructor(
        private fireBaseProvider: FireBaseProvider,
        private router: Router
    ) { }

    async login(): Promise<void> {
        try {
            this.loading = true;
            this.submitted = true;
            this.loginFailed = false;
            await this.fireBaseProvider.login(this.email?.value, this.password?.value);
            await this.router.navigate(['/fill-score']);
        } catch (error) {
            console.error(error);
            this.loginFailed = true;
        }
        this.loading = false;
    }
}
