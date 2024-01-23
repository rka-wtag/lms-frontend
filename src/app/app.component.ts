import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./Authentication/login/login.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavComponent} from "./nav/nav.component";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, NavComponent, MatButtonModule, MatToolbarModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Library Management';
}
