import {Component, inject, OnDestroy} from '@angular/core';
import {BookService} from "../../../services/Book/book.service";
import {IBookResponse} from "../../../models/auth.model";
import {NgForOf} from "@angular/common";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {AddEditBookComponent} from "../add-edit-book/add-edit-book.component";

@Component({
    selector: 'app-show-books',
    standalone: true,
    imports: [
        NgForOf,
        SidebarComponent,
        MatIcon,
        MatIconButton,
        MatButton,
        FormsModule,
        MatCheckbox,
        MatDialogContent,
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        MatDialogModule
    ],
    templateUrl: './show-books.component.html',
    styleUrl: './show-books.component.css'
})
export class ShowBooksComponent {
    public books: IBookResponse[] = [];
    public genres: String;
    public genresMap: Map<number, String> = new Map<number, String>();

    constructor(private bookService: BookService, public dialog: MatDialog) {
        this.fetchBooks();
    }

    fetchBooks(): void {
        this.bookService.fetchBooks().subscribe({
            next: (res) => {
                this.books = [];
                res.forEach(book => {
                    this.books.push(book);
                    this.genresMap.set(book.id, book.genres.map(genre => genre.name).join(', '));
                })
            },
            error: (err) => {
                this.books = [];
            }
        })
    }


    openEditBookDialog(id: number) {
        this.bookService.fetchBook(id).subscribe({
            next: (res: IBookResponse) => {
                this.dialog.open(AddEditBookComponent, {
                    data: {
                        book: res
                    }
                });
                this.bookService.loadBook.subscribe({
                    next: (val) => {
                        this.fetchBooks();
                    }
                })
            }
        })
    }

    deleteBook(id: number) {
        this.bookService.deleteBook(id).subscribe({
            next: () => {
                this.fetchBooks();
            },
            error: () => {
                this.books = [];
            }
        })
    }

}
