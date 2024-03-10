import {Routes} from '@angular/router';
import {LoginComponent} from "./Authentication/login/login.component";
import {RegistrationComponent} from "./Authentication/registration/registration.component";
import {HomeComponent} from "./Home/home/home.component";
import {guestGuard} from "./guards/guest.guard";
import {authGuard} from "./guards/auth.guard";
import {ShowBooksComponent} from "./Home/book/show-books/show-books.component";
import {AddEditBookComponent} from "./Home/book/add-edit-book/add-edit-book.component";
import {ShowGenreComponent} from "./Home/genre/show-genre/show-genre.component";
import {ShowAuthorsComponent} from "./Home/author/show-authors/show-authors.component";
import {IssuedBookComponent} from "./Home/issud-books/issued-book/issued-book.component";

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
        component: ShowBooksComponent,
        canActivate: [authGuard]
    },
    {
        path: 'showBooks',
        component: ShowBooksComponent,
        canActivate: [authGuard]
    },
    {
        path: 'showGenres',
        component: ShowGenreComponent,
        canActivate: [authGuard]
    },
    {
        path: 'showAuthors',
        component: ShowAuthorsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'issuedBooks',
        component: IssuedBookComponent,
        canActivate: [authGuard]
    },
    {
        path: 'addBook',
        component: AddEditBookComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
