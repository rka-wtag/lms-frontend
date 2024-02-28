import { Component } from '@angular/core';
import {BookService} from "../../../services/Book/book.service";
import {IBookResponse} from "../../../models/auth.model";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {MatIcon} from "@angular/material/icon";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-show-books',
  standalone: true,
  imports: [
    NgForOf,
    SidebarComponent,
    MatIcon
  ],
  templateUrl: './show-books.component.html',
  styleUrl: './show-books.component.css'
})
export class ShowBooksComponent {
  public books: IBookResponse[] = [];
  public genres: String;
  public genresMap: Map<number, String> = new Map<number, String>();
  constructor(private bookSevice: BookService, private router: Router, private toaster: ToastrService) {
    this.fetchBooks();
  }


  fetchBooks(): void {
    this.bookSevice.fetchBooks().subscribe({
      next: (res) => {
        res.forEach(book => {
          this.books.push(book);
          this.genresMap.set(book.id, book.genres.map(genre => genre.name).join(', '));
        })
      },
      error: (err: HttpErrorResponse) => {
        this.toaster.error(err.message);
      }
    })
  }
}

