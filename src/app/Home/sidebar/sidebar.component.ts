import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Urls} from "../../constants/constants";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  showBooks = Urls.showBooks;
  showAuthors = Urls.showAuthors;
  showGenres = Urls.showGenres;
  showIssuedBooks = Urls.showIssuedBooks;
  constructor(private router: Router) {}
}

