import { Routes } from '@angular/router';
import {LoginComponent} from "./Authentication/login/login.component";
import {RegistrationComponent} from "./Authentication/registration/registration.component";
import {HomeComponent} from "./Home/home/home.component";
import {guestGuard} from "./guards/guest.guard";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    }
];
