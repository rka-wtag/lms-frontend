import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";
import {CommonModule, NgIf} from "@angular/common";
import { BehaviorSubject } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {AddEditBookComponent} from "../Home/book/add-edit-book/add-edit-book.component";

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterLink,
        RouterLinkActive,
        NgIf,
        CommonModule
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent {
  isAuthenticated$: BehaviorSubject<boolean>;
  constructor(
      private tokenService: TokenService,
      private authService: AuthService,
      private matDialog: MatDialog
  ) {
    this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

    onLogout() {
        this.authService.onLogout();
    }

    saveUser() {
      this.matDialog.open(AddEditBookComponent);
    }


}
